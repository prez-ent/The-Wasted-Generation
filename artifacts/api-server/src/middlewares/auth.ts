import type { NextFunction, Request, Response } from "express";
import { getAuth, clerkClient } from "@clerk/express";
import { eq } from "drizzle-orm";
import {
  db,
  profilesTable,
  practitionerInterestsTable,
  clientEnquiriesTable,
  type Profile,
} from "@workspace/db";

declare global {
  namespace Express {
    interface Request {
      profile?: Profile;
    }
  }
}

const DEFAULT_TEAM_EMAIL = "info@thewastedgeneration.com";

function teamEmails(): string[] {
  const raw = process.env.TEAM_EMAILS ?? DEFAULT_TEAM_EMAIL;
  return raw
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

async function classifySide(email: string): Promise<"practitioner" | "client" | null> {
  const lower = email.toLowerCase();
  const [practitionerRows, clientRows] = await Promise.all([
    db.select({ id: practitionerInterestsTable.id }).from(practitionerInterestsTable),
    db.select({ id: clientEnquiriesTable.id, email: clientEnquiriesTable.email }).from(clientEnquiriesTable),
  ]);
  void practitionerRows;
  void clientRows;
  const practitioner = await db
    .select({ id: practitionerInterestsTable.id })
    .from(practitionerInterestsTable)
    .where(eq(practitionerInterestsTable.email, lower))
    .limit(1);
  const client = await db
    .select({ id: clientEnquiriesTable.id })
    .from(clientEnquiriesTable)
    .where(eq(clientEnquiriesTable.email, lower))
    .limit(1);
  const isPractitioner = practitioner.length > 0;
  const isClient = client.length > 0;
  if (isPractitioner && !isClient) return "practitioner";
  if (isClient && !isPractitioner) return "client";
  return null;
}

export async function getOrCreateProfile(req: Request): Promise<Profile | null> {
  const auth = getAuth(req);
  const clerkUserId = auth?.userId;
  if (!clerkUserId) return null;

  const existing = await db
    .select()
    .from(profilesTable)
    .where(eq(profilesTable.clerkUserId, clerkUserId))
    .limit(1);
  if (existing.length > 0) return existing[0];

  const clerkUser = await clerkClient.users.getUser(clerkUserId);
  const email =
    clerkUser.primaryEmailAddress?.emailAddress ??
    clerkUser.emailAddresses[0]?.emailAddress ??
    "";
  const emailLower = email.toLowerCase();
  const name =
    [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ").trim() || null;

  const side = emailLower ? await classifySide(emailLower) : null;
  const isTeam = emailLower !== "" && teamEmails().includes(emailLower);

  const [created] = await db
    .insert(profilesTable)
    .values({
      clerkUserId,
      email: emailLower,
      name,
      side,
      isTeam,
      currentStatus: "ENQUIRY",
    })
    .onConflictDoNothing({ target: profilesTable.clerkUserId })
    .returning();
  if (created) {
    req.log.info({ profileId: created.id, side, isTeam }, "Provisioned new profile");
    return created;
  }
  const [row] = await db
    .select()
    .from(profilesTable)
    .where(eq(profilesTable.clerkUserId, clerkUserId))
    .limit(1);
  return row ?? null;
}

export async function requireAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
  const profile = await getOrCreateProfile(req);
  if (!profile) {
    res.status(401).json({ error: "Sign in to continue." });
    return;
  }
  req.profile = profile;
  next();
}

export async function requireTeam(req: Request, res: Response, next: NextFunction): Promise<void> {
  const profile = req.profile ?? (await getOrCreateProfile(req));
  if (!profile) {
    res.status(401).json({ error: "Sign in to continue." });
    return;
  }
  if (!profile.isTeam) {
    res.status(403).json({ error: "This area is for the TWG team." });
    return;
  }
  req.profile = profile;
  next();
}
