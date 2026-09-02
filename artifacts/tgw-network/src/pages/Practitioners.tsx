import { Link } from "wouter";
import { useReveal } from "@/hooks/useReveal";
import { useState } from "react";
import { PageMeta } from "@/components/PageMeta";

export default function Practitioners() {
  useReveal();

  const [rate, setRate] = useState(900);
  const [days, setDays] = useState(35);
  const [engs, setEngs] = useState(3);
  const [peerToggled, setPeerToggled] = useState(false);
  const [coToggled, setCoToggled] = useState(false);
  const [peerDays, setPeerDays] = useState(35);
  const [coDays, setCoDays] = useState(80);
  const [tab, setTab] = useState(0);

  const engEarn = rate * days * engs;
  const pEarn = peerToggled ? rate * 0.05 * peerDays : 0;
  const cEarn = coToggled ? rate * 0.05 * coDays : 0;
  const total = engEarn + pEarn + cEarn;
  const clientPays = (rate * 1.1 * days * engs) + (peerToggled ? rate * 0.05 * peerDays : 0) + (coToggled ? rate * 0.05 * coDays : 0);

  const fmt = (n: number) => '£' + Math.round(n).toLocaleString('en-GB');

  return (
    <div id="page-practitioners">
      <PageMeta
        title="For Practitioners | Join The Wasted Generation Network"
        description="Keep 100% of your day rate. Join TWG Network as a senior fractional consultant or interim expert. 8+ years experience required. Earn peer introduction overrides."
      />
      {/* Hero */}
      <div className="prac-hero">
        <div className="container">
          <span className="label">For practitioners</span>
          <h1><span className="hero-line">You have earned the right</span>{" "}<span className="hero-line">to work on your terms.</span></h1>
          <p className="sub">TWG is a network for practitioners who have genuinely done the thing — not people looking for their next job. You bring the expertise. We bring the structure, the clients, the protection, and the economics.</p>
          <div className="hero-btns" style={{ marginTop: "2rem" }}>
            <Link href="/apply" className="btn btn-teal" data-testid="link-apply-hero">Apply to join</Link>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="econ-stats">
        <div className="econ-stat"><span className="econ-num" style={{ fontSize: "1.5rem", lineHeight: "1.3" }}>Your rate.<br />In full.</span><div className="econ-label">The 10% fee is charged to the client on top — it is never deducted from your earnings</div></div>
        <div className="econ-stat"><span className="econ-num">5%</span><div className="econ-label">Per day when you introduce a colleague into an engagement</div></div>
        <div className="econ-stat"><span className="econ-num">5%</span><div className="econ-label">Lifetime override on all activity at any company you introduce</div></div>
        <div className="econ-stat"><span className="econ-num">£500</span><div className="econ-label">The minimum day rate</div></div>
      </div>

      {/* 1 — Base model explained */}
      <section className="econ-explainer">
        <div className="container">
          <span className="label reveal">The base model explained</span>
          <h2 className="reveal">No surprises.</h2>
          <p className="reveal" style={{ maxWidth: "560px", opacity: ".75", marginBottom: "2.5rem" }}>A client engages you at £1,000 per day. They pay £1,100 — the 10% network fee is additive to your rate, charged to the client on top. You receive £1,000. The network receives £100. Your earnings are never touched. Published on our website before you join.</p>
          <p className="reveal" style={{ maxWidth: "560px", fontSize: ".82rem", opacity: ".55", marginBottom: "2.5rem" }}>Figures are shown in pounds sterling. US pricing is available — the same model applies in dollars.</p>
          <div className="econ-grid">
            <div className="econ-box reveal"><h3>When you introduce a colleague</h3><p>You introduce a fellow practitioner into an engagement. The client pays an additional 5% directly to you. For a 40-day engagement at £900/day, that is £1,800 for a single introduction. Your colleague's rate is unaffected.</p></div>
            <div className="econ-box reveal"><h3>When you introduce a company</h3><p>You earn 5% on every day billed to that company — by any practitioner, across all contracts — for as long as the company engages through the network. The economics reward the people who build the network.</p></div>
          </div>
        </div>
      </section>

      {/* 2 — Entry criteria */}
      <section className="entry">
        <div className="container entry-frame">
          <aside className="entry-aside reveal">
            <span className="label">Entry criteria</span>
            <h2>Is this network for you?</h2>
            <p className="entry-lede">The entry standard is high because the network's reputation rests on it.</p>
            <div className="entry-aside-rule" />
            <p className="entry-note">No age requirement. No institution requirement. No specific sector requirement. The standard is seniority of experience and evidence of delivery.</p>
          </aside>
          <ol className="entry-list">
            <li className="entry-item reveal"><div className="entry-num">01</div><div className="entry-text"><h4>At least 8 years in a senior functional role</h4><p>At a level where you owned outcomes, not contributed to them.</p></div></li>
            <li className="entry-item reveal"><div className="entry-num">02</div><div className="entry-text"><h4>A minimum of two independent or project-based engagements</h4><p>Where success was defined upfront and you can evidence the delivery.</p></div></li>
            <li className="entry-item reveal"><div className="entry-num">03</div><div className="entry-text"><h4>At least one verifiable reference from a decision-maker</h4><p>Someone who commissioned or sponsored your work — not a peer.</p></div></li>
            <li className="entry-item reveal"><div className="entry-num">04</div><div className="entry-text"><h4>A completed profile describing the problems you solve</h4><p>In the client's language, not a job title.</p></div></li>
            <li className="entry-item reveal"><div className="entry-num">05</div><div className="entry-text"><h4>Professional indemnity insurance of at least £500,000 per claim</h4><p>Required before any engagement commences.</p></div></li>
            <li className="entry-item reveal"><div className="entry-num">06</div><div className="entry-text"><h4>A signed membership agreement</h4><p>Covering non-circumvention, rate discussion prohibition, and 360 participation.</p></div></li>
          </ol>
          </div>
      </section>

      {/* 3 — Transparent economics (calculator) */}
      <section className="economics-dropdown-section">
        <div className="container">
          <details className="economics-dropdown">
            <summary className="economics-dropdown-summary">
              <div>
                <span className="label">Transparent economics</span>
                <h2>Calculate your annual<br />network earnings.</h2>
                <p>Adjust the sliders to see what you could earn — including introduction overrides.</p>
              </div>
              <span className="economics-dropdown-trigger" aria-hidden="true">
                <span className="economics-dropdown-trigger-label">Explore calculator</span>
                <span className="economics-dropdown-icon" />
              </span>
            </summary>
            <div className="ec-wrap economics-dropdown-content">
            <div>
              <div className="w-slider-label">Day rate <strong>£{rate}</strong></div>
              <input type="range" min="500" max="2000" step="50" value={rate} onChange={e => setRate(+e.target.value)} data-testid="slider-rate" />
              <div className="w-slider-label">Days per engagement <strong>{days}</strong></div>
              <input type="range" min="5" max="120" step="5" value={days} onChange={e => setDays(+e.target.value)} data-testid="slider-days" />
              <div className="w-slider-label">Engagements per year <strong>{engs}</strong></div>
              <input type="range" min="1" max="8" step="1" value={engs} onChange={e => setEngs(+e.target.value)} data-testid="slider-engs" />

              <div className="ec-toggle">
                <label className="ec-toggle-hdr">
                  <span>I introduce a colleague</span>
                  <span className="toggle-sw">
                    <input type="checkbox" checked={peerToggled} onChange={() => setPeerToggled(!peerToggled)} data-testid="toggle-peer" />
                    <span className="t-track"></span>
                    <span className="t-thumb"></span>
                  </span>
                </label>
                {peerToggled && (
                  <div className="ec-toggle-body open">
                    <div className="w-slider-label" style={{ marginTop: ".5rem" }}>Their engagement days <strong>{peerDays}</strong></div>
                    <input type="range" min="5" max="120" step="5" value={peerDays} onChange={e => setPeerDays(+e.target.value)} data-testid="slider-peer-days" />
                  </div>
                )}
              </div>

              <div className="ec-toggle">
                <label className="ec-toggle-hdr">
                  <span>I introduce a company</span>
                  <span className="toggle-sw">
                    <input type="checkbox" checked={coToggled} onChange={() => setCoToggled(!coToggled)} data-testid="toggle-co" />
                    <span className="t-track"></span>
                    <span className="t-thumb"></span>
                  </span>
                </label>
                {coToggled && (
                  <div className="ec-toggle-body open">
                    <div className="w-slider-label" style={{ marginTop: ".5rem" }}>Days billed to that company/year <strong>{coDays}</strong></div>
                    <input type="range" min="10" max="300" step="10" value={coDays} onChange={e => setCoDays(+e.target.value)} data-testid="slider-co-days" />
                  </div>
                )}
              </div>
            </div>
            <div className="ec-results">
              <div className="ec-total" data-testid="text-ec-total">{fmt(total)}</div>
              <div className="ec-total-lbl">Total annual network income</div>
              <div className="ec-row"><span className="ec-lbl">Your earnings (day rate, in full)</span><span className="ec-val" style={{ color: "var(--teal)" }}>{fmt(engEarn)}</span></div>
              <div className="ec-row"><span className="ec-lbl">Peer introduction override</span><span className="ec-val" style={{ color: "var(--amber)" }}>{peerToggled ? fmt(pEarn) : '—'}</span></div>
              <div className="ec-row"><span className="ec-lbl">Company introduction override</span><span className="ec-val" style={{ color: "var(--blue)" }}>{coToggled ? fmt(cEarn) : '—'}</span></div>
              <div className="ec-row"><span className="ec-lbl">What your client pays (rate + 10%)</span><span className="ec-val" style={{ color: "var(--muted)" }}>{fmt(clientPays)}</span></div>
              <div className="ec-vs">Your client pays {fmt(rate * 1.1)}/day. A traditional firm charging 25% on top would cost them {fmt(rate * 1.25)}/day — for the same rate.</div>
            </div>
          </div>
          </details>
        </div>
      </section>

      {/* 4 — Introduction overrides */}
      <section style={{ background: "var(--paper)" }}>
        <div className="container">
          <span className="label reveal">Introduction overrides</span>
          <h2 className="reveal">How your introductions<br />compound.</h2>
          <p className="reveal" style={{ maxWidth: "560px", opacity: ".75", marginBottom: "1.5rem" }}>Register every introduction before making contact to protect your override. The examples below are illustrative — your portal tracks live data.</p>
          <div style={{ marginTop: "1.5rem" }}>
            <div className="it-tabs">
              <div className={`it-tab ${tab === 0 ? 'active' : ''}`} onClick={() => setTab(0)} data-testid="tab-peer-intros">Peer introductions</div>
              <div className={`it-tab ${tab === 1 ? 'active' : ''}`} onClick={() => setTab(1)} data-testid="tab-co-intros">Company introductions</div>
              <div className={`it-tab ${tab === 2 ? 'active' : ''}`} onClick={() => setTab(2)} data-testid="tab-compound">The compound effect</div>
            </div>
            <div id="it-body">
              {tab === 0 && (
                <div className="it-card">
                  <div className="it-hdr">
                    <div>
                      <div className="it-title">Sprint introduction · M. Donnelly into Acme Retail</div>
                      <div className="it-sub">Introduced May 2026 · 28 of 40 days delivered</div>
                    </div>
                    <div><div className="it-earn">£1,260</div><div className="it-earn-lbl">Earned to date</div></div>
                  </div>
                  <div className="it-detail">
                    <div className="it-stat"><div className="it-sv">£900</div><div className="it-sl">Day rate</div></div>
                    <div className="it-stat"><div className="it-sv">5%</div><div className="it-sl">Override</div></div>
                    <div className="it-stat"><div className="it-sv">£1,800</div><div className="it-sl">Projected total</div></div>
                  </div>
                  <div className="it-prog"><div className="it-prog-fill" style={{ width: "70%" }}></div></div>
                  <div style={{ fontSize: ".78rem", color: "var(--muted)", marginTop: "6px" }}>70% complete · paid monthly in arrears</div>
                </div>
              )}
              {tab === 1 && (
                <div className="it-card">
                  <div className="it-hdr">
                    <div>
                      <div className="it-title">Acme Retail · introduced Jan 2026</div>
                      <div className="it-sub">3 practitioners deployed · 4 contracts to date · ongoing lifetime override</div>
                    </div>
                    <div><div className="it-earn">£14,800</div><div className="it-earn-lbl">Earned year 1</div></div>
                  </div>
                  <div className="it-detail">
                    <div className="it-stat"><div className="it-sv">296</div><div className="it-sl">Days billed</div></div>
                    <div className="it-stat"><div className="it-sv">5%</div><div className="it-sl">Lifetime override</div></div>
                    <div className="it-stat"><div className="it-sv">£1,000</div><div className="it-sl">Avg day rate</div></div>
                  </div>
                </div>
              )}
              {tab === 2 && (
                <div className="it-card">
                  <div className="it-hdr">
                    <div>
                      <div className="it-title">Your compound trajectory · all introductions</div>
                      <div className="it-sub">Modelled on current run-rate and average retention</div>
                    </div>
                    <div><div className="it-earn">£18,100</div><div className="it-earn-lbl">Year-to-date</div></div>
                  </div>
                  <div className="it-detail">
                    <div className="it-stat"><div className="it-sv">2</div><div className="it-sl">Peer intros</div></div>
                    <div className="it-stat"><div className="it-sv">1</div><div className="it-sl">Company intros</div></div>
                    <div className="it-stat"><div className="it-sv">£42k</div><div className="it-sl">Run-rate</div></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 5 — Membership */}
      <section className="membership">
        <div className="container">
          <span className="label reveal">Membership includes</span>
          <h2 className="reveal">What you receive.<br />What you are protected from.</h2>
          <div className="membership-grid">
            <div className="membership-col reveal">
              <h3>What you receive</h3>
              <ul>
                <li>100% of your day rate, paid within 7 days of client payment</li>
                <li>Platform invoices clients on your behalf — you never chase payment</li>
                <li>Introduction overrides tracked automatically and paid monthly</li>
                <li>IR35-safe Statement of Work template for every engagement</li>
                <li>The client's 360 score and payment record before you commit</li>
                <li>A genuine community of peers — not a Slack channel nobody uses</li>
                <li>Non-circumvention protection with an automatic audit trail</li>
                <li>A network team that is reachable as people, not a brand voice</li>
              </ul>
            </div>
            <div className="membership-col protect reveal">
              <h3>What you are protected from</h3>
              <ul>
                <li>Unilateral scope expansion — a signed amendment is required before it happens</li>
                <li>Rate coordination risk — the network is CMA-compliant by design</li>
                <li>Opaque fee structures that erode what you earn</li>
                <li>Clients you know nothing about — their 360 score is visible to you</li>
                <li>Late payment — the network escalates on your behalf at day 15</li>
                <li>IR35 misclassification — every SOW has the right provisions built in</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process steps */}
      <section className="process-section">
        <div className="container process-section-inner">
          <span className="label reveal">The process</span>
          <h2 className="reveal">Four steps. No surprises.</h2>
          <div className="process-rail">
            <ol className="process-steps">
              <li className="process-step reveal">
                <span className="process-node">1</span>
                <div className="process-step-head"><span className="process-step-icon">▤</span><h4>Express interest</h4></div>
                <p>A short form. Name, specialism, experience level, how you heard about the network. No CV.</p>
                <span className="process-chip">Takes five minutes</span>
              </li>
              <li className="process-step reveal">
                <span className="process-node">2</span>
                <div className="process-step-head"><span className="process-step-icon">▧</span><h4>Full application</h4></div>
                <p>If the initial screen passes, we send you the profile template and reference guidance. You complete both.</p>
              </li>
              <li className="process-step reveal">
                <span className="process-node">3</span>
                <div className="process-step-head"><span className="process-step-icon">⌕</span><h4>Assessment call</h4></div>
                <p>30 minutes. A conversation, not an interview. We talk about your best engagement to date and whether the network is right for you.</p>
              </li>
              <li className="process-step reveal">
                <span className="process-node">4</span>
                <div className="process-step-head"><span className="process-step-icon">✓</span><h4>Activation</h4></div>
                <p>If the answer is yes on both sides, your profile is live within 48 hours. We make your first introductions to relevant members.</p>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="prac-cta">
        <div className="container">
          <h2>If this sounds like the network you have been looking for, it probably is.</h2>
          <p className="sub">Applications are assessed individually. There is no rush and no pressure — but there is a quality bar, and we apply it consistently.</p>
          <Link href="/apply" className="btn btn-amber" data-testid="link-apply-cta">Apply to join</Link>
        </div>
      </section>
    </div>
  );
}
