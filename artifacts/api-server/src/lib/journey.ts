export type Side = "practitioner" | "client";
export type GateType = "WEBSITE-GATED" | "TEAM-GATED" | "LEGAL HOLD";

export interface GateDefinition {
  code: string;
  name: string;
  gateType: GateType;
  locks: string;
  opensWhen: string;
  openedBy: string;
  /** Status(es) that mark this gate as opened; reaching any of them opens the gate. */
  resultStatuses: string[];
}

/** Ordered status ladders. DECLINED is a terminal branch sharing APPROVED's rung. */
export const PRACTITIONER_STATUSES = [
  "ENQUIRY",
  "NDA SIGNED",
  "PACK SENT",
  "APPLICATION OPEN",
  "REVIEW READY",
  "APPROVED",
  "MEMBER",
  "ACTIVE",
] as const;

export const CLIENT_STATUSES = [
  "ENQUIRY",
  "CONVERSATION",
  "BRIEF COMPLETE",
  "AGREED",
  "MATCHED",
  "ENGAGED",
] as const;

export const DECLINED = "DECLINED";

export const PRACTITIONER_GATES: GateDefinition[] = [
  {
    code: "P-1",
    name: "Interest → NDA",
    gateType: "WEBSITE-GATED",
    locks: "All documentation. Nothing beyond the public website is visible before this gate.",
    opensWhen:
      "The interest form is submitted, the clean NDA goes out by email, and it comes back countersigned.",
    openedBy: "Sponsoring team member files the executed NDA. Status: ENQUIRY → NDA SIGNED.",
    resultStatuses: ["NDA SIGNED"],
  },
  {
    code: "P-2",
    name: "NDA → Application",
    gateType: "WEBSITE-GATED",
    locks:
      "The application form. It is never linked publicly; only the team sends the link, and only after the NDA.",
    opensWhen: "Documentation pack sent, applicant confirms they want to proceed.",
    openedBy:
      "Automatic on pack despatch plus applicant confirmation. Status: PACK SENT → APPLICATION OPEN.",
    resultStatuses: ["APPLICATION OPEN"],
  },
  {
    code: "P-3",
    name: "Application → Review",
    gateType: "TEAM-GATED",
    locks: "The founding team review. An incomplete or unverified application never reaches the team.",
    opensWhen:
      "Every mandatory field complete, day rate at or above £500, both references taken against T07, track record independently verified.",
    openedBy:
      "Sponsoring team member confirms verification. Status: VERIFICATION → REVIEW READY. The heaviest gate in the system.",
    resultStatuses: ["REVIEW READY"],
  },
  {
    code: "P-4",
    name: "Review → Offer",
    gateType: "TEAM-GATED",
    locks: "The membership offer. Nobody self-admits to TWG, and money never buys entry.",
    opensWhen: "Founding team review held, sponsor presents, simple majority admits.",
    openedBy: "The founding team collectively. Status: APPROVED or DECLINED, recorded with date.",
    resultStatuses: ["APPROVED", "DECLINED"],
  },
  {
    code: "P-5",
    name: "Offer → Member",
    gateType: "LEGAL HOLD",
    locks: "Membership itself: profile, template library, community, briefs, introduction registration.",
    opensWhen:
      "L02 membership agreement countersigned AND fee resolved: £350 paid, or founding cohort waiver confirmed with contribution expectations stated.",
    openedBy:
      "Sponsor, on signed agreement plus payment. This gate cannot operate until the solicitor signs off L02. Status: MEMBER.",
    resultStatuses: ["MEMBER"],
  },
  {
    code: "P-6",
    name: "Member → Active",
    gateType: "TEAM-GATED",
    locks: "Matching. No live profile, no briefs, no visibility to clients.",
    opensWhen:
      "Profile complete and published within 30 days of admission. The test: would a client reading it know exactly what problem this person ends?",
    openedBy: "Sponsor approves the profile for publication. Status: ACTIVE.",
    resultStatuses: ["ACTIVE"],
  },
];

export const CLIENT_GATES: GateDefinition[] = [
  {
    code: "C-1",
    name: "Contact → Conversation",
    gateType: "TEAM-GATED",
    locks: "Any substantive discussion of the client's problem.",
    opensWhen:
      "Source recorded. If introduced, a T05 registration exists or is filed now, timestamping the override entitlement.",
    openedBy:
      "Receiving team member. Five minutes that prevents every future argument about who introduced whom.",
    resultStatuses: ["CONVERSATION"],
  },
  {
    code: "C-2",
    name: "Conversation → Brief",
    gateType: "TEAM-GATED",
    locks: "The match process. No brief, no match, however promising the conversation.",
    opensWhen:
      "T02 brief complete: the problem, outcome, timeline, budget, client commitments, named owner, pillar.",
    openedBy: "Receiving team member accepts the brief as matchable. Status: BRIEF COMPLETE.",
    resultStatuses: ["BRIEF COMPLETE"],
  },
  {
    code: "C-3",
    name: "Brief → Match",
    gateType: "LEGAL HOLD",
    locks: "The introduction of any practitioner.",
    opensWhen:
      "L03 client agreement countersigned AND the fee structure confirmed in writing: rate plus 10% plus overrides, capped at 15%. No client ever discovers a fee on an invoice.",
    openedBy:
      "Receiving team member. Cannot operate until the solicitor signs off L03. Status: AGREED.",
    resultStatuses: ["AGREED"],
  },
  {
    code: "C-4",
    name: "Match → Meeting",
    gateType: "TEAM-GATED",
    locks: "The introduction meeting.",
    opensWhen:
      "A practitioner matched on problem history has seen the brief AND the client's 360 record, and accepted.",
    openedBy: "The practitioner, by accepting. Their right to decline is absolute. Status: MATCHED.",
    resultStatuses: ["MATCHED"],
  },
  {
    code: "C-5",
    name: "Meeting → Work",
    gateType: "TEAM-GATED",
    locks: "Day one. No work of any kind starts behind this gate.",
    opensWhen:
      "Meeting held, mutual yes, fee stack locked in writing, and the T01 SOW signed by practitioner, client, and TWG with KPIs, milestones, commitments, successor, and exit condition all present.",
    openedBy: "All three signatures. Never yielded to urgency. Status: ENGAGED.",
    resultStatuses: ["ENGAGED"],
  },
];

export function gatesForSide(side: Side): GateDefinition[] {
  return side === "practitioner" ? PRACTITIONER_GATES : CLIENT_GATES;
}

export function statusLadder(side: Side): readonly string[] {
  return side === "practitioner" ? PRACTITIONER_STATUSES : CLIENT_STATUSES;
}

/** Index of a status on its ladder. DECLINED shares APPROVED's rung. -1 if unknown. */
export function statusIndex(side: Side, status: string): number {
  if (side === "practitioner" && status === DECLINED) {
    return PRACTITIONER_STATUSES.indexOf("APPROVED");
  }
  return statusLadder(side).indexOf(status as never);
}

export function isValidStatus(side: Side, status: string): boolean {
  if (side === "practitioner" && status === DECLINED) return true;
  return statusLadder(side).includes(status as never);
}

/** Gate state for a profile's current status. */
export function gateState(
  side: Side,
  gate: GateDefinition,
  currentStatus: string,
): "open" | "current" | "locked" {
  const currentIdx = statusIndex(side, currentStatus);
  const gateIdx = Math.min(...gate.resultStatuses.map((s) => statusIndex(side, s)));
  if (currentIdx >= gateIdx) return "open";
  const gates = gatesForSide(side);
  const firstLocked = gates.find(
    (g) => currentIdx < Math.min(...g.resultStatuses.map((s) => statusIndex(side, s))),
  );
  return firstLocked?.code === gate.code ? "current" : "locked";
}

/** Whether a practitioner at this status may submit the membership application. */
export function canSubmitApplication(side: Side | null, status: string): boolean {
  if (side !== "practitioner") return false;
  if (status === DECLINED) return false;
  return statusIndex("practitioner", status) >= statusIndex("practitioner", "APPLICATION OPEN");
}

export interface StatusStepView {
  label: string;
  state: "reached" | "current" | "upcoming";
}

/** Status ladder rendered for a profile. Shows APPROVED/DECLINED rung appropriately. */
export function statusSteps(side: Side, currentStatus: string): StatusStepView[] {
  const ladder = statusLadder(side);
  const currentIdx = statusIndex(side, currentStatus);
  return ladder.map((label, idx) => {
    const shownLabel =
      side === "practitioner" && label === "APPROVED"
        ? currentStatus === DECLINED
          ? "DECLINED"
          : idx <= currentIdx
            ? "APPROVED"
            : "APPROVED/DECLINED"
        : label;
    return {
      label: shownLabel,
      state: idx < currentIdx ? "reached" : idx === currentIdx ? "current" : "upcoming",
    } as StatusStepView;
  });
}
