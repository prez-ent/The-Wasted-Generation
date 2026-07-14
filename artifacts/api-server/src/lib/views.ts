import { desc, eq } from "drizzle-orm";
import {
  db,
  documentsTable,
  gateEventsTable,
  membershipApplicationsTable,
  practitionerInterestsTable,
  clientEnquiriesTable,
  introductionRegistrationsTable,
  profilesTable,
  type Document,
  type Profile,
} from "@workspace/db";
import {
  DECLINED,
  canSubmitApplication,
  gateState,
  gatesForSide,
  statusIndex,
  statusSteps,
  type Side,
} from "./journey";

export interface SubmissionFieldView {
  label: string;
  value: string;
}

export interface SubmissionSummaryView {
  id: number;
  formType:
    | "practitioner-interest"
    | "membership-application"
    | "client-enquiry"
    | "introduction-registration";
  title: string;
  submittedAt: string;
  details: SubmissionFieldView[];
}

export function profileView(profile: Profile) {
  return {
    id: profile.id,
    email: profile.email,
    name: profile.name,
    side: profile.side as Side | null,
    isTeam: profile.isTeam,
    verified: profile.verifiedAt !== null,
    verifiedAt: profile.verifiedAt ? profile.verifiedAt.toISOString() : null,
    currentStatus: profile.currentStatus,
    createdAt: profile.createdAt.toISOString(),
  };
}

export function gateViews(profile: Profile) {
  const side = profile.side as Side | null;
  if (!side) return [];
  return gatesForSide(side).map((gate) => ({
    code: gate.code,
    name: gate.name,
    gateType: gate.gateType,
    locks: gate.locks,
    opensWhen: gate.opensWhen,
    openedBy: gate.openedBy,
    state: gateState(side, gate, profile.currentStatus),
  }));
}

export function statusStepViews(profile: Profile) {
  const side = profile.side as Side | null;
  if (!side) return [];
  return statusSteps(side, profile.currentStatus);
}

export function documentRecordView(doc: Document) {
  return {
    id: doc.id,
    label: doc.label,
    kind: doc.kind as "nda" | "pack" | "agreement" | "signed-copy" | "other",
    objectPath: doc.objectPath,
    uploadedByTeam: doc.uploadedByProfileId !== doc.profileId,
    createdAt: doc.createdAt.toISOString(),
  };
}

export async function documentsForProfile(profileId: number) {
  const docs = await db
    .select()
    .from(documentsTable)
    .where(eq(documentsTable.profileId, profileId))
    .orderBy(desc(documentsTable.createdAt));
  return docs.map(documentRecordView);
}

export async function submissionsForProfile(profile: Profile): Promise<SubmissionSummaryView[]> {
  const email = profile.email.toLowerCase();
  const [interests, enquiries, introductions, applications] = await Promise.all([
    db
      .select()
      .from(practitionerInterestsTable)
      .where(eq(practitionerInterestsTable.email, email)),
    db.select().from(clientEnquiriesTable).where(eq(clientEnquiriesTable.email, email)),
    db
      .select()
      .from(introductionRegistrationsTable)
      .where(eq(introductionRegistrationsTable.email, email)),
    db
      .select()
      .from(membershipApplicationsTable)
      .where(eq(membershipApplicationsTable.profileId, profile.id)),
  ]);

  const summaries: SubmissionSummaryView[] = [];

  for (const row of interests) {
    summaries.push({
      id: row.id,
      formType: "practitioner-interest",
      title: "Practitioner interest form",
      submittedAt: row.createdAt.toISOString(),
      details: [
        { label: "Full name", value: row.fullName },
        { label: "LinkedIn profile", value: row.linkedin },
        { label: "Location", value: row.location },
        { label: "Primary specialism", value: row.specialism },
        { label: "Years of senior experience", value: row.yearsExperience },
        { label: "How they heard about TWG", value: row.source },
        { label: "Introducing member", value: row.memberName ?? "—" },
        { label: "One problem they solve", value: row.problem },
      ],
    });
  }

  for (const row of enquiries) {
    summaries.push({
      id: row.id,
      formType: "client-enquiry",
      title: "Client enquiry",
      submittedAt: row.createdAt.toISOString(),
      details: [
        { label: "Name", value: row.name },
        { label: "Role", value: row.role },
        { label: "Company", value: row.company },
        { label: "Company size", value: row.companySize },
        { label: "The problem", value: row.problem },
        { label: "Timeline", value: row.timeline },
        { label: "How they found TWG", value: row.source },
        { label: "Referrer", value: row.referrerName ?? "—" },
      ],
    });
  }

  for (const row of introductions) {
    summaries.push({
      id: row.id,
      formType: "introduction-registration",
      title: "Introduction registration",
      submittedAt: row.registeredAt.toISOString(),
      details: [
        { label: "Name", value: row.name },
        { label: "Introduction type", value: row.introductionType },
        { label: "Who they are introducing", value: row.whoIntroducing },
        { label: "Relationship and context", value: row.relationshipContext },
        { label: "Contact made", value: row.contactMade },
      ],
    });
  }

  for (const row of applications) {
    summaries.push({
      id: row.id,
      formType: "membership-application",
      title: "Membership application",
      submittedAt: row.createdAt.toISOString(),
      details: [
        { label: "Career history", value: row.careerHistory },
        { label: "Problems solved, with evidence", value: row.problemsSolved },
        { label: "Proposed day rate (£)", value: String(row.dayRate) },
        { label: "Referee 1", value: row.referee1 },
        { label: "Referee 2", value: row.referee2 },
        { label: "Contracting entity", value: row.contractingEntity },
      ],
    });
  }

  summaries.sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));
  return summaries;
}

export async function buildMeResponse(profile: Profile) {
  const side = profile.side as Side | null;
  const verified = profile.verifiedAt !== null;
  const [documents, submissions, applications] = await Promise.all([
    verified ? documentsForProfile(profile.id) : Promise.resolve([]),
    submissionsForProfile(profile),
    db
      .select({ id: membershipApplicationsTable.id })
      .from(membershipApplicationsTable)
      .where(eq(membershipApplicationsTable.profileId, profile.id))
      .limit(1),
  ]);

  const applicationSubmitted = applications.length > 0;
  const canApply =
    verified &&
    !applicationSubmitted &&
    canSubmitApplication(side, profile.currentStatus);
  const showIntroductionForm =
    verified &&
    side === "practitioner" &&
    profile.currentStatus !== DECLINED &&
    statusIndex("practitioner", profile.currentStatus) >=
      statusIndex("practitioner", "MEMBER");

  return {
    profile: profileView(profile),
    gates: gateViews(profile),
    statuses: statusStepViews(profile),
    documents,
    submissions,
    canApply,
    applicationSubmitted,
    showIntroductionForm,
  };
}

export async function historyForProfile(profileId: number) {
  const events = await db
    .select({
      id: gateEventsTable.id,
      gateCode: gateEventsTable.gateCode,
      status: gateEventsTable.status,
      note: gateEventsTable.note,
      createdAt: gateEventsTable.createdAt,
      actorName: profilesTable.name,
      actorEmail: profilesTable.email,
    })
    .from(gateEventsTable)
    .leftJoin(profilesTable, eq(gateEventsTable.actorProfileId, profilesTable.id))
    .where(eq(gateEventsTable.profileId, profileId))
    .orderBy(desc(gateEventsTable.createdAt));
  return events.map((e) => ({
    id: e.id,
    gateCode: e.gateCode,
    status: e.status,
    actorName: e.actorName ?? e.actorEmail ?? null,
    note: e.note,
    createdAt: e.createdAt.toISOString(),
  }));
}
