import { Router, type IRouter, type Request, type Response } from "express";
import { desc, eq, sql } from "drizzle-orm";
import {
  db,
  documentsTable,
  gateEventsTable,
  membershipApplicationsTable,
  practitionerInterestsTable,
  clientEnquiriesTable,
  introductionRegistrationsTable,
  profilesTable,
  type Profile,
} from "@workspace/db";
import {
  SetPersonStatusBody,
  CreatePersonDocumentBody,
  SetPersonTeamRoleBody,
} from "@workspace/api-zod";
import { requireTeam } from "../middlewares/auth";
import {
  DECLINED,
  gatesForSide,
  isValidStatus,
  statusLadder,
  type Side,
} from "../lib/journey";
import {
  documentsForProfile,
  documentRecordView,
  gateViews,
  historyForProfile,
  profileView,
  statusStepViews,
  submissionsForProfile,
} from "../lib/views";

const router: IRouter = Router();

router.use("/admin", requireTeam);

async function loadPerson(req: Request, res: Response): Promise<Profile | null> {
  const personId = Number(req.params.personId);
  if (!Number.isInteger(personId)) {
    res.status(404).json({ error: "Person not found." });
    return null;
  }
  const [person] = await db
    .select()
    .from(profilesTable)
    .where(eq(profilesTable.id, personId))
    .limit(1);
  if (!person) {
    res.status(404).json({ error: "Person not found." });
    return null;
  }
  return person;
}

function gateCodeForStatus(side: Side, status: string): string | null {
  const gate = gatesForSide(side).find((g) => g.resultStatuses.includes(status));
  return gate?.code ?? null;
}

async function allowedStatusChanges(person: Profile) {
  const side = person.side as Side | null;
  if (!side) return [];
  const ladder = [...statusLadder(side)];
  const options = side === "practitioner" ? [...ladder, DECLINED] : ladder;
  const [ndaDoc] =
    side === "practitioner"
      ? await db
          .select({ id: documentsTable.id })
          .from(documentsTable)
          .where(
            sql`${documentsTable.profileId} = ${person.id} AND ${documentsTable.kind} = 'nda'`,
          )
          .limit(1)
      : [undefined];
  return options
    .filter((status) => status !== person.currentStatus && status !== "ENQUIRY")
    .map((status) => {
      const ndaBlocked = status === "NDA SIGNED" && ndaDoc === undefined;
      return {
        status,
        gateCode: gateCodeForStatus(side, status),
        enabled: !ndaBlocked,
        disabledReason: ndaBlocked
          ? "Upload the executed NDA to this profile before signing off Gate P-1."
          : null,
      };
    });
}

async function buildPersonDetail(person: Profile) {
  const [documents, submissions, history, allowed, verifier] = await Promise.all([
    documentsForProfile(person.id),
    submissionsForProfile(person),
    historyForProfile(person.id),
    allowedStatusChanges(person),
    person.verifiedById
      ? db
          .select({ name: profilesTable.name, email: profilesTable.email })
          .from(profilesTable)
          .where(eq(profilesTable.id, person.verifiedById))
          .limit(1)
      : Promise.resolve([]),
  ]);
  return {
    profile: profileView(person),
    verifiedByName: verifier[0]?.name ?? verifier[0]?.email ?? null,
    gates: gateViews(person),
    statuses: statusStepViews(person),
    allowedStatusChanges: allowed,
    documents,
    submissions,
    history,
  };
}

router.get("/admin/people", async (_req: Request, res: Response): Promise<void> => {
  const [people, interestCounts, enquiryCounts, introCounts, appCounts, docCounts] =
    await Promise.all([
      db.select().from(profilesTable).orderBy(desc(profilesTable.createdAt)),
      db
        .select({
          email: sql<string>`lower(${practitionerInterestsTable.email})`,
          count: sql<number>`count(*)::int`,
        })
        .from(practitionerInterestsTable)
        .groupBy(sql`lower(${practitionerInterestsTable.email})`),
      db
        .select({
          email: sql<string>`lower(${clientEnquiriesTable.email})`,
          count: sql<number>`count(*)::int`,
        })
        .from(clientEnquiriesTable)
        .groupBy(sql`lower(${clientEnquiriesTable.email})`),
      db
        .select({
          email: sql<string>`lower(${introductionRegistrationsTable.email})`,
          count: sql<number>`count(*)::int`,
        })
        .from(introductionRegistrationsTable)
        .groupBy(sql`lower(${introductionRegistrationsTable.email})`),
      db
        .select({
          profileId: membershipApplicationsTable.profileId,
          count: sql<number>`count(*)::int`,
        })
        .from(membershipApplicationsTable)
        .groupBy(membershipApplicationsTable.profileId),
      db
        .select({
          profileId: documentsTable.profileId,
          count: sql<number>`count(*)::int`,
        })
        .from(documentsTable)
        .groupBy(documentsTable.profileId),
    ]);

  const byEmail = new Map<string, number>();
  for (const rows of [interestCounts, enquiryCounts, introCounts]) {
    for (const row of rows) {
      byEmail.set(row.email, (byEmail.get(row.email) ?? 0) + row.count);
    }
  }
  const appsByProfile = new Map<number, number>();
  for (const row of appCounts) {
    if (row.profileId !== null) appsByProfile.set(row.profileId, row.count);
  }
  const docsByProfile = new Map<number, number>();
  for (const row of docCounts) {
    docsByProfile.set(row.profileId, row.count);
  }

  res.json(
    people.map((person) => ({
      ...profileView(person),
      submissionCount:
        (byEmail.get(person.email.toLowerCase()) ?? 0) + (appsByProfile.get(person.id) ?? 0),
      documentCount: docsByProfile.get(person.id) ?? 0,
    })),
  );
});

router.get("/admin/people/:personId", async (req: Request, res: Response): Promise<void> => {
  const person = await loadPerson(req, res);
  if (!person) return;
  res.json(await buildPersonDetail(person));
});

router.post(
  "/admin/people/:personId/verify",
  async (req: Request, res: Response): Promise<void> => {
    const person = await loadPerson(req, res);
    if (!person) return;
    if (person.verifiedAt === null) {
      const actor = req.profile!;
      const [updated] = await db
        .update(profilesTable)
        .set({ verifiedAt: new Date(), verifiedById: actor.id })
        .where(eq(profilesTable.id, person.id))
        .returning();
      await db.insert(gateEventsTable).values({
        profileId: person.id,
        gateCode: null,
        status: updated.currentStatus,
        actorProfileId: actor.id,
        note: "Account verified by the team.",
      });
      req.log.info({ personId: person.id, actorId: actor.id }, "Account verified");
      res.json(await buildPersonDetail(updated));
      return;
    }
    res.json(await buildPersonDetail(person));
  },
);

router.post(
  "/admin/people/:personId/status",
  async (req: Request, res: Response): Promise<void> => {
    const person = await loadPerson(req, res);
    if (!person) return;
    const parsed = SetPersonStatusBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid status change." });
      return;
    }
    const side = person.side as Side | null;
    if (!side) {
      res
        .status(400)
        .json({ error: "This person has not chosen a journey yet, so no gates can be opened." });
      return;
    }
    const { status, note } = parsed.data;
    if (!isValidStatus(side, status) || status === "ENQUIRY") {
      res.status(400).json({ error: `"${status}" is not a valid ${side} status.` });
      return;
    }
    if (status === person.currentStatus) {
      res.status(400).json({ error: `They are already at ${status}.` });
      return;
    }
    if (status === "NDA SIGNED") {
      const [ndaDoc] = await db
        .select({ id: documentsTable.id })
        .from(documentsTable)
        .where(
          sql`${documentsTable.profileId} = ${person.id} AND ${documentsTable.kind} = 'nda'`,
        )
        .limit(1);
      if (!ndaDoc) {
        res.status(400).json({
          error: "Gate P-1 cannot be signed off until the executed NDA is uploaded to this profile.",
        });
        return;
      }
    }
    const actor = req.profile!;
    const [updated] = await db
      .update(profilesTable)
      .set({ currentStatus: status })
      .where(eq(profilesTable.id, person.id))
      .returning();
    await db.insert(gateEventsTable).values({
      profileId: person.id,
      gateCode: gateCodeForStatus(side, status),
      status,
      actorProfileId: actor.id,
      note: note?.trim() || null,
    });
    req.log.info(
      { personId: person.id, actorId: actor.id, status },
      "Status changed by team",
    );
    res.json(await buildPersonDetail(updated));
  },
);

router.post(
  "/admin/people/:personId/documents",
  async (req: Request, res: Response): Promise<void> => {
    const person = await loadPerson(req, res);
    if (!person) return;
    const parsed = CreatePersonDocumentBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid document details." });
      return;
    }
    const actor = req.profile!;
    const [doc] = await db
      .insert(documentsTable)
      .values({
        profileId: person.id,
        label: parsed.data.label,
        kind: parsed.data.kind,
        objectPath: parsed.data.objectPath,
        uploadedByProfileId: actor.id,
      })
      .returning();
    req.log.info(
      { personId: person.id, actorId: actor.id, documentId: doc.id },
      "Team uploaded document",
    );
    res.status(201).json(documentRecordView(doc));
  },
);

router.post(
  "/admin/people/:personId/team",
  async (req: Request, res: Response): Promise<void> => {
    const person = await loadPerson(req, res);
    if (!person) return;
    const parsed = SetPersonTeamRoleBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid role change." });
      return;
    }
    const actor = req.profile!;
    if (person.id === actor.id && !parsed.data.isTeam) {
      res.status(400).json({ error: "You cannot remove your own team access." });
      return;
    }
    const [updated] = await db
      .update(profilesTable)
      .set({ isTeam: parsed.data.isTeam })
      .where(eq(profilesTable.id, person.id))
      .returning();
    req.log.info(
      { personId: person.id, actorId: actor.id, isTeam: parsed.data.isTeam },
      "Team role changed",
    );
    res.json(await buildPersonDetail(updated));
  },
);

export default router;
