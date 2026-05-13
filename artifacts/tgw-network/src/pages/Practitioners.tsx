import { Link } from "wouter";
import { useReveal } from "@/hooks/useReveal";
import { useState } from "react";

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
      <div className="prac-hero">
        <div className="container">
          <span className="label" style={{ color: "var(--navy)" }}>For Practitioners</span>
          <h1>A market that protects your rate and rewards your introductions.</h1>
          <p className="sub">Traditional agencies hide their margin and take a cut of your rate. TGW Network is transparent: you set your rate, you keep 100% of it, and the client pays a published 10% fee on top. When you introduce others, you get paid.</p>
        </div>
      </div>
      <section className="econ-explainer">
        <div className="container">
          <span className="label reveal">The Economics</span>
          <h2 className="reveal">How the money works.</h2>
          <div className="ec-wrap reveal">
            <div>
              <div className="w-slider-label">Your day rate <strong>{fmt(rate)}</strong></div>
              <input type="range" min="500" max="2000" step="50" value={rate} onChange={e => setRate(+e.target.value)} />
              
              <div className="w-slider-label">Days per engagement <strong>{days}</strong></div>
              <input type="range" min="5" max="120" step="5" value={days} onChange={e => setDays(+e.target.value)} />
              
              <div className="w-slider-label">Engagements per year <strong>{engs}</strong></div>
              <input type="range" min="1" max="8" step="1" value={engs} onChange={e => setEngs(+e.target.value)} />

              <div className="ec-toggle mt-4">
                <div className="ec-toggle-hdr" onClick={() => setPeerToggled(!peerToggled)}>
                  <span>I introduce a colleague into an engagement</span>
                  <div className="toggle-sw">
                    <input type="checkbox" checked={peerToggled} onChange={() => setPeerToggled(!peerToggled)} />
                    <div className="t-track"></div>
                    <div className="t-thumb"></div>
                  </div>
                </div>
                {peerToggled && (
                  <div className="ec-toggle-body open">
                    <div className="w-slider-label">Their engagement days <strong>{peerDays}</strong></div>
                    <input type="range" min="5" max="120" step="5" value={peerDays} onChange={e => setPeerDays(+e.target.value)} />
                  </div>
                )}
              </div>

              <div className="ec-toggle">
                <div className="ec-toggle-hdr" onClick={() => setCoToggled(!coToggled)}>
                  <span>I introduce a company to the network</span>
                  <div className="toggle-sw">
                    <input type="checkbox" checked={coToggled} onChange={() => setCoToggled(!coToggled)} />
                    <div className="t-track"></div>
                    <div className="t-thumb"></div>
                  </div>
                </div>
                {coToggled && (
                  <div className="ec-toggle-body open">
                    <div className="w-slider-label">Days billed to that company/year <strong>{coDays}</strong></div>
                    <input type="range" min="10" max="300" step="10" value={coDays} onChange={e => setCoDays(+e.target.value)} />
                  </div>
                )}
              </div>
            </div>
            
            <div className="ec-results">
              <div className="ec-total">{fmt(total)}</div>
              <div className="ec-total-lbl">Total annual network income</div>
              
              <div className="ec-row">
                <span className="ec-lbl">Your engagements</span>
                <span className="ec-val">{fmt(engEarn)}</span>
              </div>
              <div className="ec-row">
                <span className="ec-lbl">Peer introduction overrides</span>
                <span className="ec-val">{peerToggled ? fmt(pEarn) : '—'}</span>
              </div>
              <div className="ec-row">
                <span className="ec-lbl">Company introduction overrides</span>
                <span className="ec-val">{coToggled ? fmt(cEarn) : '—'}</span>
              </div>
              
              <div className="ec-vs mt-6">
                Your client pays {fmt(rate * 1.1)}/day. A traditional firm charging 25% on top would cost them {fmt(rate * 1.25)}/day — for the same rate.
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="membership">
        <div className="container">
          <span className="label reveal">The Tracker</span>
          <h2 className="reveal">Introduction tracking.</h2>
          <div className="it-tabs reveal">
            <div className={`it-tab ${tab === 0 ? 'active' : ''}`} onClick={() => setTab(0)}>Peer introductions</div>
            <div className={`it-tab ${tab === 1 ? 'active' : ''}`} onClick={() => setTab(1)}>Company introductions</div>
            <div className={`it-tab ${tab === 2 ? 'active' : ''}`} onClick={() => setTab(2)}>The compound effect</div>
          </div>
          <div id="it-body" className="reveal">
            {tab === 0 && (
              <>
                <div className="it-card">
                  <div className="it-hdr">
                    <div><div className="it-title">Sprint introduction · M. Donnelly into Acme Retail</div><div className="it-sub">Introduced May 2026 · 28 of 40 days delivered</div></div>
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
              </>
            )}
            {tab === 1 && (
              <>
                <div className="it-card">
                  <div className="it-hdr">
                    <div><div className="it-title">Acme Retail · introduced Jan 2026</div><div className="it-sub">3 practitioners deployed · 4 contracts to date · ongoing lifetime override</div></div>
                    <div><div className="it-earn">£14,800</div><div className="it-earn-lbl">Earned year 1</div></div>
                  </div>
                  <div className="it-detail">
                    <div className="it-stat"><div className="it-sv">296</div><div className="it-sl">Days billed</div></div>
                    <div className="it-stat"><div className="it-sv">5%</div><div className="it-sl">Lifetime override</div></div>
                    <div className="it-stat"><div className="it-sv">£1,000</div><div className="it-sl">Avg day rate</div></div>
                  </div>
                </div>
              </>
            )}
            {tab === 2 && (
              <>
                <div className="it-card">
                  <div className="it-hdr">
                    <div><div className="it-title">Your compound trajectory · all introductions</div><div className="it-sub">Modelled on current run-rate and average retention</div></div>
                    <div><div className="it-earn">£18,100</div><div className="it-earn-lbl">Year-to-date</div></div>
                  </div>
                  <div className="it-detail">
                    <div className="it-stat"><div className="it-sv">2</div><div className="it-sl">Peer intros</div></div>
                    <div className="it-stat"><div className="it-sv">1</div><div className="it-sl">Company intros</div></div>
                    <div className="it-stat"><div className="it-sv">£42k</div><div className="it-sl">Run-rate</div></div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
      <section className="prac-cta">
        <div className="container-n">
          <h2 className="reveal">Apply to join the network.</h2>
          <p className="sub reveal">The application process takes five minutes. If there's a fit, we'll send the full profile template.</p>
          <Link href="/apply" className="btn btn-navy reveal mt-4">Start application</Link>
        </div>
      </section>
    </div>
  );
}
