import { Router, type IRouter, type Request } from "express";
import {
  db,
  practitionerInterestsTable,
  membershipApplicationsTable,
  clientEnquiriesTable,
  introductionRegistrationsTable,
} from "@workspace/db";
import {
  SubmitPractitionerInterestBody,
  SubmitMembershipApplicationBody,
  SubmitClientEnquiryBody,
  SubmitIntroductionRegistrationBody,
} from "@workspace/api-zod";
import {
  sendEmail,
  fieldsToText,
  fieldsToHtml,
  escapeHtml,
  TEAM_EMAIL,
  type EmailField,
} from "../lib/mailer";

const router: IRouter = Router();

const UNDER_EIGHT_MESSAGE =
  "TWG entry criteria require a minimum of eight years at senior level. We would love to hear from you when you reach that point.";
const MIN_RATE_MESSAGE = "The network minimum day rate is £500.";

function formatLondonTimestamp(date: Date): string {
  return date.toLocaleString("en-GB", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Europe/London",
  });
}

async function sendTeamEmail(req: Request, subject: string, fields: EmailField[]): Promise<void> {
  try {
    await sendEmail({
      to: TEAM_EMAIL,
      subject,
      text: fieldsToText(fields),
      html: fieldsToHtml(fields),
    });
  } catch (err) {
    req.log.error({ err, subject }, "Failed to send team notification email");
  }
}

router.post("/submissions/practitioner-interest", async (req, res): Promise<void> => {
  if (req.body?.yearsExperience === "Under 8") {
    res.status(400).json({ error: UNDER_EIGHT_MESSAGE });
    return;
  }
  const parsed = SubmitPractitionerInterestBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Invalid submission" });
    return;
  }
  const data = parsed.data;
  if (data.source === "Member introduction" && !data.memberName?.trim()) {
    res.status(400).json({ error: "Please tell us which member introduced you." });
    return;
  }

  const [row] = await db
    .insert(practitionerInterestsTable)
    .values({
      fullName: data.fullName,
      email: data.email,
      linkedin: data.linkedin,
      location: data.location,
      specialism: data.specialism,
      yearsExperience: data.yearsExperience,
      source: data.source,
      memberName: data.memberName?.trim() || null,
      problem: data.problem,
    })
    .returning();

  await sendTeamEmail(req, `TWG website: practitioner interest from ${data.fullName}`, [
    { label: "Full name", value: data.fullName },
    { label: "Email", value: data.email },
    { label: "LinkedIn profile", value: data.linkedin },
    { label: "Location", value: data.location },
    { label: "Primary specialism", value: data.specialism },
    { label: "Years of senior experience", value: data.yearsExperience },
    { label: "How did you hear about TWG?", value: data.source },
    { label: "Which member introduced you?", value: data.memberName?.trim() || "—" },
    { label: "One problem you solve", value: data.problem },
    { label: "Submitted", value: formatLondonTimestamp(row.createdAt) },
  ]);

  res.status(201).json({ id: row.id });
});

router.post("/submissions/membership-application", async (req, res): Promise<void> => {
  const rawRate = Number(req.body?.dayRate);
  if (Number.isFinite(rawRate) && rawRate < 500) {
    res.status(400).json({ error: MIN_RATE_MESSAGE });
    return;
  }
  const parsed = SubmitMembershipApplicationBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Invalid submission" });
    return;
  }
  const data = parsed.data;

  const [row] = await db
    .insert(membershipApplicationsTable)
    .values({
      careerHistory: data.careerHistory,
      problemsSolved: data.problemsSolved,
      dayRate: data.dayRate,
      referee1: data.referee1,
      referee2: data.referee2,
      contractingEntity: data.contractingEntity,
    })
    .returning();

  await sendTeamEmail(req, "TWG website: full membership application received", [
    { label: "Career history", value: data.careerHistory },
    { label: "Problems solved, with evidence", value: data.problemsSolved },
    { label: "Proposed day rate (£)", value: String(data.dayRate) },
    { label: "Referee 1", value: data.referee1 },
    { label: "Referee 2", value: data.referee2 },
    { label: "Contracting entity", value: data.contractingEntity },
    { label: "Submitted", value: formatLondonTimestamp(row.createdAt) },
  ]);

  res.status(201).json({ id: row.id });
});

router.post("/submissions/client-enquiry", async (req, res): Promise<void> => {
  const parsed = SubmitClientEnquiryBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Invalid submission" });
    return;
  }
  const data = parsed.data;
  const needsReferrer =
    data.source === "Referral from advisor" || data.source === "Member introduction";
  if (needsReferrer && !data.referrerName?.trim()) {
    res.status(400).json({ error: "Please tell us who referred you." });
    return;
  }

  const [row] = await db
    .insert(clientEnquiriesTable)
    .values({
      name: data.name,
      role: data.role,
      company: data.company,
      email: data.email,
      companySize: data.companySize,
      problem: data.problem,
      timeline: data.timeline,
      source: data.source,
      referrerName: data.referrerName?.trim() || null,
    })
    .returning();

  await sendTeamEmail(req, `TWG website: client enquiry from ${data.name} (${data.company})`, [
    { label: "Your name", value: data.name },
    { label: "Role", value: data.role },
    { label: "Company", value: data.company },
    { label: "Email", value: data.email },
    { label: "Company size", value: data.companySize },
    { label: "The problem", value: data.problem },
    { label: "When you need this solved", value: data.timeline },
    { label: "How did you find TWG?", value: data.source },
    { label: "Who referred you?", value: data.referrerName?.trim() || "—" },
    { label: "Submitted", value: formatLondonTimestamp(row.createdAt) },
  ]);

  res.status(201).json({ id: row.id });
});

router.post("/submissions/introduction-registration", async (req, res): Promise<void> => {
  const parsed = SubmitIntroductionRegistrationBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Invalid submission" });
    return;
  }
  const data = parsed.data;

  const [row] = await db
    .insert(introductionRegistrationsTable)
    .values({
      name: data.name,
      email: data.email,
      introductionType: data.introductionType,
      whoIntroducing: data.whoIntroducing,
      relationshipContext: data.relationshipContext,
      contactMade: data.contactMade,
    })
    .returning();

  const stamp = formatLondonTimestamp(row.registeredAt);

  await sendTeamEmail(req, `TWG website: introduction registered by ${data.name}`, [
    { label: "Your name", value: data.name },
    { label: "Email", value: data.email },
    { label: "Introduction type", value: data.introductionType },
    { label: "Who they are introducing", value: data.whoIntroducing },
    { label: "Relationship and context", value: data.relationshipContext },
    { label: "Has contact been made yet?", value: data.contactMade },
    { label: "Registered at", value: stamp },
  ]);

  try {
    const confirmationText = `Registered. Your introduction is registered as of ${stamp}.\n\nIntroduction type: ${data.introductionType}\nWho you are introducing: ${data.whoIntroducing}\n\nThis timestamp is your entitlement record.\n\nTWG · The Wasted Generation`;
    const confirmationHtml = `<div style="font-family:Arial,sans-serif;font-size:14px;color:#2C2C2C;"><p><strong>Registered.</strong> Your introduction is registered as of <strong>${stamp}</strong>.</p><p>Introduction type: ${escapeHtml(data.introductionType)}<br>Who you are introducing: ${escapeHtml(data.whoIntroducing)}</p><p>This timestamp is your entitlement record.</p><p>TWG · The Wasted Generation</p></div>`;
    await sendEmail({
      to: data.email,
      subject: `Your TWG introduction is registered — ${stamp}`,
      text: confirmationText,
      html: confirmationHtml,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to send introduction confirmation email to submitter");
  }

  res.status(201).json({
    id: row.id,
    registeredAt: row.registeredAt.toISOString(),
    registeredAtDisplay: stamp,
  });
});

export default router;
