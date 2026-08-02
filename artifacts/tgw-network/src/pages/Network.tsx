import { Link } from "wouter";
import { useReveal } from "@/hooks/useReveal";
import { useState } from "react";
import { PageMeta } from "@/components/PageMeta";

const PRINCIPLES = [
  {
    num: '01', name: 'Collaboration', color: '#085041', bg: '#F0FAF6',
    statement: 'We actively make each other better. The economics of the network are designed so that helping someone else succeed means you succeed too.',
    i: ['Peer introduction overrides — paid', 'Company introduction overrides — lifetime', 'Reputation built across the network'],
    a: ['Self-promotion at the cost of peers', 'Hoarding clients or knowledge', 'Treating colleagues as competition'],
    d: ['No fees on internal peer referrals', '5% override paid to introducers', 'Public recognition of strong contributors'],
    hl: 'Helping someone else succeed earns you income.',
    sub: 'Most networks pay lip service. This one writes it into the fee schedule.'
  },
  {
    num: '02', name: 'Approachability', color: '#0C447C', bg: '#EEF5FC',
    statement: 'No hierarchy, no gatekeeping. The network team is reachable as people, not a brand voice. Practitioners and clients are addressable directly.',
    i: ['Direct contact with the network team', 'Practitioners contactable through profile', 'First-name basis — internal and external'],
    a: ['Ticketing systems and queue numbers', 'Hiding behind a brand voice', 'Slow scripted replies'],
    d: ['Email reply within one working day', 'Calls offered when useful', 'Founder reachable directly'],
    hl: 'No ticket numbers. No bots. Andrew picks up the phone.',
    sub: 'If you have to ask who to talk to, we have already failed.'
  },
  {
    num: '03', name: 'Mutual benefit', color: '#B87028', bg: '#FFF8F0',
    statement: 'This only works if it works for everyone. Not mostly for the platform, not mostly for clients, not mostly for practitioners — for every party, fairly.',
    i: ['Practitioner keeps 100% of rate', 'Client pays a published, modest fee', 'Network funded by transparent margin'],
    a: ['Extracting value at one side\'s expense', 'Hidden fees on either party', 'Bidding wars or rate suppression'],
    d: ['Fee additive — never deducted from practitioner', 'Fee published on the website', 'Caps on total override to protect clients'],
    hl: 'Practitioner. Client. Network. Three winners — or no deal.',
    sub: 'The economics are designed so no party loses for another to gain.'
  },
  {
    num: '04', name: 'Transparency', color: '#1E2D40', bg: '#F7F7F7',
    statement: 'Fees published. Ratings visible. Process explained. If you have to ask, we have already failed.',
    i: ['Fees on the pricing page', '360 scores visible before engagement', 'Match reasoning shared with both sides'],
    a: ['Rates "on application"', 'Hidden commission structures', 'Vague engagement letters'],
    d: ['Pricing page lists every fee and example', 'Both sides see scores before commitment', 'Audit trail on every introduction'],
    hl: '10%. Not "rates on application". Not "depends".',
    sub: 'Published in the same place for every visitor. Forever.'
  },
  {
    num: '05', name: 'Openness', color: '#3C3489', bg: '#F5F4FE',
    statement: 'We are building this with the people in it, not for them. Your challenge is welcome. The model evolves with the network.',
    i: ['Founding cohort shapes the model', 'Quarterly member forums', 'Network team open to scrutiny'],
    a: ['"Take it or leave it" platform terms', 'Closed-door governance', 'Members as passive consumers'],
    d: ['Public roadmap', 'Member-elected representation as cohort grows', 'Annual review of every governance rule'],
    hl: 'You are not a user. You are a member.',
    sub: 'The platform is built with the cohort, not deployed onto them.'
  }
];

export default function Network() {
  useReveal();

  const [pcSel, setPcSel] = useState(0);
  const p = PRINCIPLES[pcSel];

  const [fwTab, setFwTab] = useState('prac');

  return (
    <div id="page-network">
      <PageMeta
        title="The Network | Governance & 360 Evaluation Framework"
        description="TWG Network is governed by five principles of character and a bilateral 360 evaluation framework that holds both practitioners and organisations accountable."
      />
      <div className="network-hero">
        <div className="container">
          <span className="label">The Network</span>
          <h1><span className="hero-line">A network built on principles,</span>{" "}<span className="hero-line">not just promises.</span></h1>
          <p className="sub">Governance that applies to both sides, economics that share value fairly, and a character that is explicit about what it will and will not do.</p>
        </div>
      </div>

      <section style={{ background: "var(--paper)" }}>
        <div className="container">
          <span className="label reveal">Five principles of character</span>
          <h2 className="reveal">Not policies on a wall.<br />How every decision gets made.</h2>
          <p className="reveal" style={{ maxWidth: "580px", opacity: ".75", marginBottom: "2rem" }}>When something feels uncertain, the answer is here.</p>
          <div style={{ marginTop: "1rem" }}>
            <div className="pc-pills">
              {PRINCIPLES.map((prin, i) => (
                <div
                  key={prin.num}
                  className={`pc-pill ${i === pcSel ? 'active' : ''}`}
                  onClick={() => setPcSel(i)}
                  style={i === pcSel ? { background: prin.color, color: "#fff", borderColor: prin.color } : {}}
                  data-testid={`pill-principle-${i}`}
                >
                  {prin.name}
                </div>
              ))}
            </div>
            <div style={{ background: p.bg, padding: "2rem", borderLeft: `3px solid ${p.color}`, marginTop: "1rem" }}>
              <div className="pc-num-tag" style={{ color: p.color }}>{p.num} — Principle</div>
              <div className="pc-pname">{p.name}</div>
              <div className="pc-statement">{p.statement}</div>
              <div className="pc-three">
                <div className="pc-col">
                  <div className="pc-col-title" style={{ color: p.color }}>It looks like</div>
                  {p.i.map((x, idx) => <div key={idx} className="pc-item">{x}</div>)}
                </div>
                <div className="pc-col">
                  <div className="pc-col-title" style={{ color: "#A32D2D" }}>It does not look like</div>
                  {p.a.map((x, idx) => <div key={idx} className="pc-item">{x}</div>)}
                </div>
                <div className="pc-col">
                  <div className="pc-col-title" style={{ color: p.color }}>How we operationalise it</div>
                  {p.d.map((x, idx) => <div key={idx} className="pc-item">{x}</div>)}
                </div>
              </div>
              <div className="pc-site-box" style={{ background: "#fff", borderLeftColor: p.color }}>
                <div className="pc-site-hl" style={{ color: p.color }}>"{p.hl}"</div>
                <div className="pc-site-sub">{p.sub}</div>
              </div>
            </div>
            <div className="pc-nav">
              <button className="pc-nav-btn" disabled={pcSel === 0} onClick={() => setPcSel(Math.max(0, pcSel - 1))} data-testid="btn-principle-prev">← Previous</button>
              <div className="pc-progress">
                {PRINCIPLES.map((_, i) => (
                  <div key={i} className={`pc-dot ${i === pcSel ? 'active' : ''}`} onClick={() => setPcSel(i)} style={i === pcSel ? { background: p.color } : {}}></div>
                ))}
              </div>
              <button className="pc-nav-btn" disabled={pcSel === PRINCIPLES.length - 1} onClick={() => setPcSel(Math.min(PRINCIPLES.length - 1, pcSel + 1))} data-testid="btn-principle-next">Next →</button>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--offwhite)" }}>
        <div className="container-w">
          <span className="label reveal">Governance</span>
          <h2 className="reveal">Governance that<br />means something.</h2>
          <div className="governance-grid">
            <div className="gov-card reveal"><h3>The bilateral 360</h3><p>Every practitioner is evaluated after every engagement. So is every client. Scores are visible to both parties before they commit. A bad client does not get access to great practitioners. A practitioner with a strong score earns priority access to the best engagements.</p></div>
            <div className="gov-card reveal"><h3>The mandatory SOW</h3><p>Every engagement begins with a Statement of Work. Not optional guidance — a hard requirement. Defined deliverables, agreed KPIs, timeline, and what access the client commits to providing. The 360 is scored against this document.</p></div>
            <div className="gov-card reveal"><h3>The entry standard</h3><p>Practitioners are assessed before they join. Minimum eight years senior functional experience. At least two verified outcome-led engagements. A reference from a decision-maker. And a 30-minute panel conversation to assess whether the Principles of Character resonate.</p></div>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--paper)" }}>
        <div className="container">
          <span className="label reveal">The 360 evaluation framework</span>
          <h2 className="reveal">Both sides are evaluated.<br />Scores are permanent and portable.</h2>
          <div style={{ marginTop: "1rem" }}>
            <div className="fw-tabs">
              <button className={`fw-tab ${fwTab === 'prac' ? 'active' : ''}`} onClick={() => setFwTab('prac')} data-testid="tab-prac-eval">Practitioner evaluation</button>
              <button className={`fw-tab ${fwTab === 'client' ? 'active' : ''}`} onClick={() => setFwTab('client')} data-testid="tab-client-eval">Client evaluation</button>
              <button className={`fw-tab ${fwTab === 'scale' ? 'active' : ''}`} onClick={() => setFwTab('scale')} data-testid="tab-what-scores">What scores mean</button>
              <button className={`fw-tab ${fwTab === 'thresh' ? 'active' : ''}`} onClick={() => setFwTab('thresh')} data-testid="tab-thresholds">Thresholds</button>
            </div>

            {fwTab === 'prac' && (
              <div className="fw-panel active">
                <table className="fw-table">
                  <thead><tr><th>Dimension</th><th>Weight</th><th>Rated by</th><th>What it measures</th></tr></thead>
                  <tbody>
                    <tr><td className="fw-dim">KPI delivery</td><td><strong style={{ color: "var(--navy)" }}>35%</strong><div className="fw-wt-bar"><div className="fw-wt-fill" style={{ width: "35%", background: "var(--navy)" }}></div></div></td><td style={{ color: "var(--muted)" }}>Client</td><td>Were the agreed outcomes in the SOW delivered? This is the primary signal — everything else is context.</td></tr>
                    <tr><td className="fw-dim">Communication</td><td><strong style={{ color: "var(--amber)" }}>20%</strong><div className="fw-wt-bar"><div className="fw-wt-fill" style={{ width: "20%", background: "var(--amber)" }}></div></div></td><td style={{ color: "var(--muted)" }}>Client</td><td>Clear, proactive, honest. Did they flag problems early? Did they keep the right people informed?</td></tr>
                    <tr><td className="fw-dim">Collaboration</td><td><strong style={{ color: "var(--amber)" }}>20%</strong><div className="fw-wt-bar"><div className="fw-wt-fill" style={{ width: "20%", background: "var(--amber)" }}></div></div></td><td style={{ color: "var(--muted)" }}>Client + peer</td><td>Did they work with the client's team, not around them? Did they bring in the right people when needed?</td></tr>
                    <tr><td className="fw-dim">Network citizenship</td><td><strong style={{ color: "var(--teal)" }}>15%</strong><div className="fw-wt-bar"><div className="fw-wt-fill" style={{ width: "15%", background: "var(--teal)" }}></div></div></td><td style={{ color: "var(--muted)" }}>Peer (anon)</td><td>Did they uphold network principles and support other members? Anonymous peer rating.</td></tr>
                    <tr><td className="fw-dim">Integrity</td><td><strong style={{ color: "var(--muted)" }}>10%</strong><div className="fw-wt-bar"><div className="fw-wt-fill" style={{ width: "10%", background: "var(--muted)" }}></div></div></td><td style={{ color: "var(--muted)" }}>Client + network</td><td>Operated within agreed terms, avoided conflicts, represented themselves honestly throughout.</td></tr>
                  </tbody>
                </table>
              </div>
            )}

            {fwTab === 'client' && (
              <div className="fw-panel active">
                <div className="fw-ind"><strong>Industry first:</strong> No other network rates client companies. A practitioner sees a client's 360 score before accepting an engagement.</div>
                <table className="fw-table">
                  <thead><tr><th>Dimension</th><th>Weight</th><th>Rated by</th><th>What it measures</th></tr></thead>
                  <tbody>
                    <tr><td className="fw-dim">KPI clarity</td><td><strong style={{ color: "var(--blue)" }}>30%</strong><div className="fw-wt-bar"><div className="fw-wt-fill" style={{ width: "30%", background: "var(--blue)" }}></div></div></td><td style={{ color: "var(--muted)" }}>Practitioner</td><td>Did the client provide clear, measurable outcomes at the start? Ambiguous briefs are the single biggest cause of failed engagements.</td></tr>
                    <tr><td className="fw-dim">Responsiveness</td><td><strong style={{ color: "var(--blue)" }}>25%</strong><div className="fw-wt-bar"><div className="fw-wt-fill" style={{ width: "25%", background: "var(--blue)" }}></div></div></td><td style={{ color: "var(--muted)" }}>Practitioner</td><td>Did they provide access, information, and decisions in a timely manner? Did they remove blockers?</td></tr>
                    <tr><td className="fw-dim">Respect</td><td><strong style={{ color: "var(--blue)" }}>25%</strong><div className="fw-wt-bar"><div className="fw-wt-fill" style={{ width: "25%", background: "var(--blue)" }}></div></div></td><td style={{ color: "var(--muted)" }}>Practitioner</td><td>Were practitioners treated as expert peers, not managed as contractors?</td></tr>
                    <tr><td className="fw-dim">Payment integrity</td><td><strong style={{ color: "var(--teal)" }}>20%</strong><div className="fw-wt-bar"><div className="fw-wt-fill" style={{ width: "20%", background: "var(--teal)" }}></div></div></td><td style={{ color: "var(--muted)" }}>Platform (data)</td><td>Hard data — not a rating. Were invoices paid on agreed terms? Late payment recorded automatically at day 15.</td></tr>
                  </tbody>
                </table>
              </div>
            )}

            {fwTab === 'scale' && (
              <div className="fw-panel active">
                <div className="fw-score-grid">
                  <div className="fw-sc" style={{ background: "var(--l-teal)" }}><div className="fw-sc-val" style={{ color: "var(--teal)" }}>5</div><div className="fw-sc-lbl" style={{ color: "var(--teal)" }}>Exceptional</div><div className="fw-sc-desc" style={{ color: "var(--teal)" }}>Delivered beyond KPIs. Would engage again without hesitation.</div></div>
                  <div className="fw-sc" style={{ background: "#EDF7E6" }}><div className="fw-sc-val" style={{ color: "#27500A" }}>4</div><div className="fw-sc-lbl" style={{ color: "#27500A" }}>Strong</div><div className="fw-sc-desc" style={{ color: "#27500A" }}>Delivered all agreed KPIs. No significant issues.</div></div>
                  <div className="fw-sc" style={{ background: "var(--l-amber)" }}><div className="fw-sc-val" style={{ color: "#633806" }}>3</div><div className="fw-sc-lbl" style={{ color: "#633806" }}>Acceptable</div><div className="fw-sc-desc" style={{ color: "#633806" }}>Delivered most KPIs. Some gaps. Would engage with different scope.</div></div>
                  <div className="fw-sc" style={{ background: "var(--l-coral)" }}><div className="fw-sc-val" style={{ color: "#712B13" }}>2</div><div className="fw-sc-lbl" style={{ color: "#712B13" }}>Below standard</div><div className="fw-sc-desc" style={{ color: "#712B13" }}>Material failure. Triggers governance review automatically.</div></div>
                  <div className="fw-sc" style={{ background: "#FEF0F0" }}><div className="fw-sc-val" style={{ color: "#A32D2D" }}>1</div><div className="fw-sc-lbl" style={{ color: "#A32D2D" }}>Serious concern</div><div className="fw-sc-desc" style={{ color: "#A32D2D" }}>Genuine misconduct. Immediate profile suspension.</div></div>
                </div>
              </div>
            )}

            {fwTab === 'thresh' && (
              <div className="fw-panel active">
                <div className="fw-thresh"><span className="fw-badge" style={{ background: "var(--l-teal)", color: "var(--teal)" }}>4.5+</span><div className="fw-thresh-text"><strong>Elevated status.</strong> Featured in search results. First access to premium engagements. Fast-track introduction rights.</div></div>
                <div className="fw-thresh"><span className="fw-badge" style={{ background: "var(--l-blue)", color: "var(--blue)" }}>3.5–4.4</span><div className="fw-thresh-text"><strong>Good standing.</strong> Full network access. No restrictions. Standard matching.</div></div>
                <div className="fw-thresh"><span className="fw-badge" style={{ background: "var(--l-amber)", color: "#633806" }}>3.0–3.4</span><div className="fw-thresh-text"><strong>Review triggered.</strong> Private conversation with network team within 5 days. Development conversation offered. Score visible — profile not hidden.</div></div>
                <div className="fw-thresh"><span className="fw-badge" style={{ background: "#FEF0F0", color: "#A32D2D" }}>Below 3.0</span><div className="fw-thresh-text"><strong>Profile suspended.</strong> Formal investigation begins within 24 hours. Right of appeal preserved. One independent appeal per 12 months.</div></div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="stats-row tight">
        <div className="container-w">
          <div className="stats-grid">
            <div className="stat-block reveal"><span className="stat-num">£5.7bn</span><div className="stat-label">Global fractional executive market, growing at 14% annually</div></div>
            <div className="stat-block reveal"><span className="stat-num">74%</span><div className="stat-label">Of fractional engagements come from referrals — the core of how this network works</div></div>
            <div className="stat-block reveal"><span className="stat-num">68%</span><div className="stat-label">Growth in demand for fractional executives 2023–24</div></div>
            <div className="stat-block reveal"><span className="stat-num">31%</span><div className="stat-label">Of failed fractional projects traced to unclear scope — solved by the mandatory SOW</div></div>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--offwhite)", padding: "3rem 0" }}>
        <div className="container">
          <p className="reveal" style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center", fontFamily: "var(--serif)", fontSize: "1.15rem", fontWeight: 300, lineHeight: "1.65", color: "var(--navy)" }}>The fractional market is not a trend. It is a structural shift in how organisations access expertise. The question is not whether to engage fractional practitioners — it is whether to do it with accountability infrastructure or without it.</p>
        </div>
      </section>

      <section style={{ background: "var(--offwhite)" }}>
        <div className="container-w">
          <span className="label reveal">How TWG compares</span>
          <h2 className="reveal">The fractional market has grown.<br />So has the gap.</h2>
          <p className="reveal" style={{ opacity: ".72", maxWidth: "560px" }}>Between what most platforms offer and what practitioners and clients actually need.</p>
          <div className="cm-wrap">
            <table className="cm-table">
              <thead><tr>
                <th style={{ minWidth: "190px" }}>Feature</th>
                <th className="us" style={{ minWidth: "130px" }}>TWG Network</th>
                <th style={{ minWidth: "120px" }}>Traditional interim</th>
                <th style={{ minWidth: "100px" }}>Free directory</th>
                <th style={{ minWidth: "110px" }}>Fractional Jobs</th>
                <th style={{ minWidth: "90px" }}>Toptal</th>
              </tr></thead>
              <tbody>
                <tr><td className="feat">Published fee structure</td><td className="us"><span className="cm-tick">✓</span> 10% — on website</td><td><span className="cm-cross">✗</span> Never disclosed</td><td><span className="cm-tick">✓</span> Free / no fee</td><td className="cm-part">~ One-time fee</td><td><span className="cm-cross">✗</span> Undisclosed %</td></tr>
                <tr><td className="feat">Clients rated / 360'd</td><td className="us"><span className="cm-tick">✓</span> Full 360, visible</td><td><span className="cm-cross">✗</span> Never</td><td><span className="cm-cross">✗</span> Never</td><td><span className="cm-cross">✗</span> Never</td><td><span className="cm-cross">✗</span> Never</td></tr>
                <tr><td className="feat">Mandatory SOW / KPIs</td><td className="us"><span className="cm-tick">✓</span> Required, templated</td><td className="cm-part">~ Optional</td><td><span className="cm-cross">✗</span> None</td><td><span className="cm-cross">✗</span> None</td><td className="cm-part">~ Encouraged</td></tr>
                <tr><td className="feat">Practitioner earns on introductions</td><td className="us"><span className="cm-tick">✓</span> 5% override, ongoing</td><td><span className="cm-cross">✗</span> None</td><td><span className="cm-cross">✗</span> None</td><td><span className="cm-cross">✗</span> None</td><td><span className="cm-cross">✗</span> None</td></tr>
                <tr><td className="feat">Company intro lifetime override</td><td className="us"><span className="cm-tick">✓</span> 5% life of contracts</td><td><span className="cm-cross">✗</span> None</td><td><span className="cm-cross">✗</span> None</td><td><span className="cm-cross">✗</span> None</td><td><span className="cm-cross">✗</span> None</td></tr>
                <tr><td className="feat">Quality gate on entry</td><td className="us"><span className="cm-tick">✓</span> 8yr min, verified</td><td><span className="cm-tick">✓</span> Varies</td><td><span className="cm-cross">✗</span> Self-reported</td><td className="cm-part">~ Light vetting</td><td><span className="cm-tick">✓</span> Strong vetting</td></tr>
                <tr><td className="feat">360 score travels with practitioner</td><td className="us"><span className="cm-tick">✓</span> Portable, permanent</td><td><span className="cm-cross">✗</span> None</td><td><span className="cm-cross">✗</span> None</td><td><span className="cm-cross">✗</span> None</td><td className="cm-part">~ Client feedback only</td></tr>
                <tr><td className="feat">Non-circumvention protection</td><td className="us"><span className="cm-tick">✓</span> 24 months, damages</td><td><span className="cm-tick">✓</span> Standard clause</td><td><span className="cm-cross">✗</span> None</td><td><span className="cm-cross">✗</span> None</td><td><span className="cm-tick">✓</span> Yes</td></tr>
                <tr><td className="feat">Typical client fee above day rate</td><td className="us">10% (+5% where applicable)</td><td>20–35%</td><td>Zero</td><td>One-time flat</td><td>15–25%</td></tr>
              </tbody>
            </table>
            <div className="cm-source">Source: Market research and published pricing, April 2026. ✓ Standard &nbsp;~ Partial or optional &nbsp;✗ Not offered</div>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--paper)" }}>
        <div className="container-w">
          <span className="label reveal">The network</span>
          <h2 className="reveal">Curated, not collected.</h2>
          <p className="reveal" style={{ opacity: ".72", maxWidth: "560px" }}>The founding cohort is forming now. Every practitioner is verified on entry — minimum eight years at senior level, verified outcome-led engagements, and a reference from a decision-maker. Only real, confirmed members appear on this site.</p>
          <div className="ps-gate reveal" style={{ marginTop: "1.5rem" }}>
            <p>Confirmed practitioner profiles — including verified outcomes, engagement history, and 360 score detail — will be published here as the founding cohort completes verification. Registered clients get access first.</p>
            <Link href="/register" className="btn btn-amber" data-testid="link-register-profiles">Register to be introduced</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
