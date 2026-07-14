import { useState } from "react";
import { Show } from "@clerk/react";
import { Redirect, Link } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import {
  useGetMe,
  useListPeople,
  useGetPerson,
  useVerifyPerson,
  useSetPersonStatus,
  useCreatePersonDocument,
  useSetPersonTeamRole,
  getListPeopleQueryKey,
  getGetPersonQueryKey,
  type PersonSummary,
} from "@workspace/api-client-react";
import { PageMeta } from "@/components/PageMeta";
import { DocumentUpload } from "@/components/DocumentUpload";
import { GateCard, StatusRail, DocumentList, SubmissionList } from "./Dashboard";

function extractErrorMessage(err: unknown): string {
  const data = (err as { data?: { error?: string } } | null)?.data;
  return data?.error ?? "Something went wrong. Please try again.";
}

function sideLabel(side: PersonSummary["side"]): string {
  if (side === "practitioner") return "Practitioner";
  if (side === "client") return "Organisation";
  return "—";
}

function PersonPanel({ personId }: { personId: number }) {
  const qc = useQueryClient();
  const person = useGetPerson(personId);
  const [note, setNote] = useState("");
  const [actionError, setActionError] = useState<string | null>(null);

  const invalidate = async () => {
    await Promise.all([
      qc.invalidateQueries({ queryKey: getGetPersonQueryKey(personId) }),
      qc.invalidateQueries({ queryKey: getListPeopleQueryKey() }),
    ]);
  };

  const verify = useVerifyPerson({
    mutation: {
      onSuccess: invalidate,
      onError: (e) => setActionError(extractErrorMessage(e)),
    },
  });
  const setStatus = useSetPersonStatus({
    mutation: {
      onSuccess: async () => {
        setNote("");
        setActionError(null);
        await invalidate();
      },
      onError: (e) => setActionError(extractErrorMessage(e)),
    },
  });
  const createDocument = useCreatePersonDocument();
  const setTeamRole = useSetPersonTeamRole({
    mutation: {
      onSuccess: invalidate,
      onError: (e) => setActionError(extractErrorMessage(e)),
    },
  });

  if (person.isPending) {
    return <p className="portal-empty">Loading…</p>;
  }
  if (person.isError) {
    return <p className="portal-empty">Couldn't load this person. {extractErrorMessage(person.error)}</p>;
  }

  const d = person.data;
  const p = d.profile;

  return (
    <div className="person-panel" data-testid={`person-panel-${p.id}`}>
      <div className="person-head">
        <div>
          <h3 data-testid="text-person-name">{p.name || p.email}</h3>
          <p className="person-meta">
            {p.email} · {sideLabel(p.side)} · Joined {new Date(p.createdAt).toLocaleDateString("en-GB")}
            {p.isTeam && <span className="pill pill-navy">Team</span>}
            {p.verified ? (
              <span className="pill pill-teal">
                Verified{d.verifiedByName ? ` by ${d.verifiedByName}` : ""}
              </span>
            ) : (
              <span className="pill pill-amber">Awaiting verification</span>
            )}
          </p>
        </div>
      </div>

      {actionError && <div className="upload-error" data-testid="text-action-error">{actionError}</div>}

      <div className="person-block">
        <h4>Account</h4>
        <div className="status-actions">
          {!p.verified && (
            <button
              className="btn btn-teal"
              disabled={verify.isPending}
              onClick={() => verify.mutate({ personId })}
              data-testid="button-verify"
            >
              {verify.isPending ? "Verifying…" : "Verify this account"}
            </button>
          )}
          <button
            className="btn btn-outline-navy"
            disabled={setTeamRole.isPending}
            onClick={() => setTeamRole.mutate({ personId, data: { isTeam: !p.isTeam } })}
            data-testid="button-toggle-team"
          >
            {p.isTeam ? "Remove team role" : "Grant team role"}
          </button>
        </div>
      </div>

      <div className="person-block">
        <h4>Journey</h4>
        <p className="person-meta">Current status: <strong>{p.currentStatus}</strong></p>
        <StatusRail statuses={d.statuses} />
        {d.allowedStatusChanges.length > 0 && (
          <>
            <label className="note-label">
              Note (recorded in the history)
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Optional — e.g. NDA received by email"
                data-testid="input-status-note"
              />
            </label>
            <div className="status-actions">
              {d.allowedStatusChanges.map((opt) => (
                <span key={opt.status} className="status-action-wrap">
                  <button
                    className="btn btn-navy"
                    disabled={!opt.enabled || setStatus.isPending}
                    title={opt.disabledReason ?? undefined}
                    onClick={() =>
                      setStatus.mutate({
                        personId,
                        data: { status: opt.status, ...(note.trim() ? { note: note.trim() } : {}) },
                      })
                    }
                    data-testid={`button-status-${opt.status.replace(/\s+/g, "-").toLowerCase()}`}
                  >
                    {opt.gateCode ? `${opt.gateCode}: ` : ""}
                    Set {opt.status}
                  </button>
                  {!opt.enabled && opt.disabledReason && (
                    <span className="status-disabled-reason">{opt.disabledReason}</span>
                  )}
                </span>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="person-block">
        <h4>Gates</h4>
        {d.gates.length === 0 ? (
          <p className="portal-empty">No journey selected yet.</p>
        ) : (
          d.gates.map((g) => <GateCard key={g.code} gate={g} />)
        )}
      </div>

      <div className="person-block">
        <h4>Documents</h4>
        <DocumentList documents={d.documents} />
        <DocumentUpload
          heading="Upload a document for this person"
          allowedKinds={["nda", "pack", "agreement", "signed-copy", "other"]}
          defaultKind="nda"
          onCreate={async (doc) => {
            await createDocument.mutateAsync({ personId, data: doc });
            await invalidate();
          }}
        />
      </div>

      <div className="person-block">
        <h4>Submissions</h4>
        <SubmissionList submissions={d.submissions} />
      </div>

      <div className="person-block">
        <h4>History</h4>
        {d.history.length === 0 ? (
          <p className="portal-empty">Nothing yet.</p>
        ) : (
          <ul className="history-list">
            {d.history.map((h) => (
              <li key={h.id}>
                <span className="history-date">{new Date(h.createdAt).toLocaleString("en-GB")}</span>
                <span>
                  {h.gateCode ? `${h.gateCode} — ` : ""}
                  {h.status}
                  {h.actorName ? ` (by ${h.actorName})` : ""}
                  {h.note ? ` — ${h.note}` : ""}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function TeamContent() {
  const me = useGetMe();
  const isTeam = me.data?.profile.isTeam === true;
  const people = useListPeople({ query: { queryKey: getListPeopleQueryKey(), enabled: isTeam } });
  const [selectedId, setSelectedId] = useState<number | null>(null);

  if (me.isPending) {
    return (
      <div className="portal-section">
        <div className="container-w">
          <p className="portal-empty">Loading…</p>
        </div>
      </div>
    );
  }

  if (!isTeam) {
    return (
      <div className="portal-section">
        <div className="container-n">
          <h2>Team only</h2>
          <p className="portal-empty">
            This area is for the TWG team. <Link href="/dashboard">Back to your member area</Link>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div id="page-team">
      <div className="portal-hero">
        <div className="container-w">
          <span className="label" style={{ color: "rgba(255,255,255,.5)" }}>Team area</span>
          <h1>People</h1>
          <p className="sub">
            Verify accounts and open gates by hand. Nothing here happens automatically — that is the
            point.
          </p>
          <div className="portal-hero-actions">
            <Link href="/dashboard" className="btn btn-outline-white" data-testid="link-back-dashboard">
              Your member area
            </Link>
          </div>
        </div>
      </div>

      <section className="portal-section" style={{ paddingTop: "3rem" }}>
        <div className="container-w">
          {people.isPending && <p className="portal-empty">Loading people…</p>}
          {people.isError && <p className="portal-empty">Couldn't load the list of people.</p>}
          {people.data && people.data.length === 0 && (
            <p className="portal-empty">No accounts yet.</p>
          )}
          {people.data && people.data.length > 0 && (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Person</th>
                    <th>Side</th>
                    <th>Status</th>
                    <th>Verified</th>
                    <th>Docs</th>
                    <th>Forms</th>
                  </tr>
                </thead>
                <tbody>
                  {people.data.map((p) => (
                    <tr
                      key={p.id}
                      className={selectedId === p.id ? "selected" : ""}
                      onClick={() => setSelectedId(selectedId === p.id ? null : p.id)}
                      data-testid={`row-person-${p.id}`}
                    >
                      <td>
                        <div className="doc-label">{p.name || p.email}</div>
                        <div className="doc-meta">{p.email}{p.isTeam ? " · team" : ""}</div>
                      </td>
                      <td>{sideLabel(p.side)}</td>
                      <td>{p.currentStatus}</td>
                      <td>{p.verified ? "✓" : "—"}</td>
                      <td>{p.documentCount}</td>
                      <td>{p.submissionCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {selectedId !== null && <PersonPanel personId={selectedId} />}
        </div>
      </section>
    </div>
  );
}

export default function Team() {
  return (
    <>
      <PageMeta title="Team area" description="TWG Network team area." />
      <Show when="signed-out">
        <Redirect to="/sign-in" />
      </Show>
      <Show when="signed-in">
        <TeamContent />
      </Show>
    </>
  );
}
