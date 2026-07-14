import { Show, useClerk } from "@clerk/react";
import { Redirect, Link } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import {
  useGetMe,
  useSelectSide,
  useCreateMyDocument,
  getGetMeQueryKey,
  type MeResponse,
  type GateView,
  type StatusStep,
  type DocumentRecord,
  type SubmissionSummary,
} from "@workspace/api-client-react";
import { PageMeta } from "@/components/PageMeta";
import { DocumentUpload } from "@/components/DocumentUpload";
import { basePath } from "@/lib/clerk";

function extractErrorMessage(err: unknown): string {
  const data = (err as { data?: { error?: string } } | null)?.data;
  return data?.error ?? "Something went wrong. Please try again.";
}

export function GateCard({ gate }: { gate: GateView }) {
  return (
    <div className={`gate-card gate-${gate.state}`} data-testid={`gate-${gate.code}`}>
      <div className="gate-head">
        <span className="gate-state-icon" aria-hidden>
          {gate.state === "open" ? "✓" : gate.state === "current" ? "→" : "🔒"}
        </span>
        <div>
          <span className="gate-code">
            {gate.code} · {gate.gateType} · {gate.state === "open" ? "Open" : gate.state === "current" ? "You are here" : "Locked"}
          </span>
          <h3>{gate.name}</h3>
        </div>
      </div>
      <dl className="gate-facts">
        <div>
          <dt>Locks</dt>
          <dd>{gate.locks}</dd>
        </div>
        <div>
          <dt>Opens when</dt>
          <dd>{gate.opensWhen}</dd>
        </div>
        <div>
          <dt>Opened by</dt>
          <dd>{gate.openedBy}</dd>
        </div>
      </dl>
    </div>
  );
}

export function StatusRail({ statuses }: { statuses: StatusStep[] }) {
  return (
    <ol className="status-rail" data-testid="status-rail">
      {statuses.map((s) => (
        <li key={s.label} className={`status-step ${s.state}`}>
          {s.label}
        </li>
      ))}
    </ol>
  );
}

export function DocumentList({ documents }: { documents: DocumentRecord[] }) {
  if (documents.length === 0) {
    return <p className="portal-empty">No documents yet.</p>;
  }
  return (
    <ul className="doc-list">
      {documents.map((d) => (
        <li key={d.id} data-testid={`document-${d.id}`}>
          <div>
            <span className="doc-kind">{d.kind}</span>
            <div className="doc-label">{d.label}</div>
            <div className="doc-meta">
              {d.uploadedByTeam ? "Uploaded by the team" : "Uploaded by you"} ·{" "}
              {new Date(d.createdAt).toLocaleDateString("en-GB")}
            </div>
          </div>
          <a
            className="btn btn-outline-navy btn-small"
            href={`/api/storage${d.objectPath}`}
            target="_blank"
            rel="noreferrer"
            data-testid={`link-document-${d.id}`}
          >
            View
          </a>
        </li>
      ))}
    </ul>
  );
}

export function SubmissionList({ submissions }: { submissions: SubmissionSummary[] }) {
  if (submissions.length === 0) {
    return <p className="portal-empty">No form submissions yet.</p>;
  }
  return (
    <div>
      {submissions.map((s) => (
        <details className="submission-item" key={`${s.formType}-${s.id}`} data-testid={`submission-${s.formType}-${s.id}`}>
          <summary className="submission-summary">
            <span>{s.title}</span>
            <span className="submission-date">{new Date(s.submittedAt).toLocaleDateString("en-GB")}</span>
          </summary>
          <dl className="submission-details">
            {s.details.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </details>
      ))}
    </div>
  );
}

function SideChooser() {
  const qc = useQueryClient();
  const selectSide = useSelectSide({
    mutation: {
      onSuccess: (data: MeResponse) => {
        qc.setQueryData(getGetMeQueryKey(), data);
      },
    },
  });

  return (
    <section className="portal-section">
      <div className="container-n">
        <div className="side-chooser">
          <span className="label">One question first</span>
          <h2>Which journey are you on?</h2>
          <p className="side-chooser-sub">
            This decides which gates apply to your account. If you're unsure, choose the side you'd sign
            paperwork as.
          </p>
          {selectSide.isError && (
            <div className="upload-error">{extractErrorMessage(selectSide.error)}</div>
          )}
          <div className="side-chooser-grid">
            <button
              className="side-card"
              disabled={selectSide.isPending}
              onClick={() => selectSide.mutate({ data: { side: "practitioner" } })}
              data-testid="button-side-practitioner"
            >
              <h3>I'm a practitioner</h3>
              <p>I want to join the network and take engagements.</p>
            </button>
            <button
              className="side-card"
              disabled={selectSide.isPending}
              onClick={() => selectSide.mutate({ data: { side: "client" } })}
              data-testid="button-side-client"
            >
              <h3>I'm hiring</h3>
              <p>My organisation has a problem that needs a senior expert.</p>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function DashboardContent() {
  const { signOut } = useClerk();
  const qc = useQueryClient();
  const me = useGetMe();
  const createDocument = useCreateMyDocument();

  if (me.isPending) {
    return (
      <div className="portal-hero">
        <div className="container-w">
          <p className="portal-loading">Loading your member area…</p>
        </div>
      </div>
    );
  }

  if (me.isError) {
    return (
      <div className="portal-section">
        <div className="container-n">
          <p className="portal-empty">We couldn't load your member area. Please refresh the page.</p>
        </div>
      </div>
    );
  }

  const data = me.data;
  const { profile } = data;
  const verified = profile.verified;
  const displayName = profile.name || profile.email;

  return (
    <div id="page-dashboard">
      <div className="portal-hero">
        <div className="container-w">
          <span className="label" style={{ color: "rgba(255,255,255,.5)" }}>
            Member area{profile.side ? ` · ${profile.side === "practitioner" ? "Practitioner" : "Organisation"}` : ""}
          </span>
          <h1 data-testid="text-dashboard-name">{displayName}</h1>
          <p className="sub" data-testid="text-current-status">
            Current status: {profile.currentStatus}
          </p>
          <div className="portal-hero-actions">
            {profile.isTeam && (
              <Link href="/team" className="btn btn-amber" data-testid="link-team-area">
                Team area
              </Link>
            )}
            <button
              className="btn btn-outline-white"
              onClick={() => signOut({ redirectUrl: basePath || "/" })}
              data-testid="button-sign-out"
            >
              Sign out
            </button>
          </div>
          {!verified && profile.side !== null && (
            <div className="verify-banner" data-testid="banner-awaiting-verification">
              <strong>Awaiting verification.</strong> The team checks every account by hand — no
              automation. Your gates, documents and forms unlock once your account is verified.
            </div>
          )}
        </div>
      </div>

      {profile.side === null ? (
        <SideChooser />
      ) : (
        <>
          <section className="portal-section" style={{ paddingTop: "3rem" }}>
            <div className="container-w">
              <h2>Where you are</h2>
              <StatusRail statuses={data.statuses} />
              {data.canApply && (
                <div className="portal-cta" data-testid="cta-apply">
                  <p>
                    <strong>The application gate is open for you.</strong> Your NDA has been returned —
                    you can now complete the membership application.
                  </p>
                  <Link href="/membership-application-k7x2v9q4mt" className="btn btn-amber" data-testid="link-membership-application">
                    Open the membership application
                  </Link>
                </div>
              )}
              {data.applicationSubmitted && (
                <div className="portal-cta portal-cta-quiet" data-testid="text-application-submitted">
                  <p>
                    Your membership application has been submitted. Your references will be contacted, and
                    you will hear from your sponsor within ten working days.
                  </p>
                </div>
              )}
              {data.showIntroductionForm && (
                <div className="portal-cta" data-testid="cta-introduction">
                  <p>
                    <strong>As a member, you can register introductions.</strong> Introduce a company and
                    the 5% lifetime override follows every engagement they book.
                  </p>
                  <Link href="/register-introduction-w8n3j6r2pf" className="btn btn-navy" data-testid="link-register-introduction">
                    Register an introduction
                  </Link>
                </div>
              )}
            </div>
          </section>

          <section className="portal-section">
            <div className="container-w">
              <h2>Your gates</h2>
              <p className="portal-section-sub">
                Every step of the journey is a gate. Nothing opens automatically — each gate is opened by
                hand, and the text below is the rule, verbatim.
              </p>
              {data.gates.map((g) => (
                <GateCard key={g.code} gate={g} />
              ))}
            </div>
          </section>

          <section className="portal-section">
            <div className="container-w">
              <h2>Documents</h2>
              {verified ? (
                <>
                  <DocumentList documents={data.documents} />
                  <DocumentUpload
                    heading="Upload a signed copy"
                    allowedKinds={["signed-copy", "other"]}
                    defaultKind="signed-copy"
                    onCreate={async (doc) => {
                      await createDocument.mutateAsync({ data: doc });
                      await qc.invalidateQueries({ queryKey: getGetMeQueryKey() });
                    }}
                  />
                </>
              ) : (
                <p className="portal-empty" data-testid="text-documents-locked">
                  🔒 Documents unlock once your account is verified.
                </p>
              )}
            </div>
          </section>

          <section className="portal-section">
            <div className="container-w">
              <h2>Your submissions</h2>
              <SubmissionList submissions={data.submissions} />
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default function Dashboard() {
  return (
    <>
      <PageMeta title="Member area" description="Your TWG Network member area." />
      <Show when="signed-out">
        <Redirect to="/sign-in" />
      </Show>
      <Show when="signed-in">
        <DashboardContent />
      </Show>
    </>
  );
}
