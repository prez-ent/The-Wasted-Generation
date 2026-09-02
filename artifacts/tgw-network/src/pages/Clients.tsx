import { Link } from "wouter";
import { useReveal } from "@/hooks/useReveal";
import { useState } from "react";
import { PageMeta } from "@/components/PageMeta";

const ES_TYPES = [
  {
    id: 'sprint', color: '#0C447C', bg: '#EEF5FC', tc: '#0C447C', name: 'Sprint', dur: '15–30 days',
    desc: 'Defined deliverable. Tight timeline. Best when the problem is clear and speed matters.',
    r: ['Problem is clearly defined before you start', 'Outcome is measurable and agreed', 'Client has urgency — speed matters', 'Internal team can act once diagnosis is done'],
    f: ['Single SOW with 3–5 KPIs maximum', 'Daily or every-other-day check-in cadence', 'Single deliverable at end — not phased', '360 evaluation at completion only']
  },
  {
    id: 'project', color: '#085041', bg: '#F0FAF6', tc: '#085041', name: 'Project', dur: '30–90 days',
    desc: 'Phased delivery across a broader scope. Diagnosis, implementation, and internal handover.',
    r: ['Problem spans multiple areas or functions', 'Implementation as well as diagnosis required', 'Internal capability needs building alongside delivery', 'Phased milestones make sense for the scope'],
    f: ['SOW with defined phase milestones', 'Mid-point review at day 30–45', 'Weekly update to internal champion', '360 review at each major milestone']
  },
  {
    id: 'ongoing', color: '#3C3489', bg: '#F5F4FE', tc: '#3C3489', name: 'Ongoing', dur: '90+ days',
    desc: 'Sustained fractional leadership. SOW refreshed quarterly. Exit criteria defined from day one.',
    r: ['Sustained senior presence needed over time', 'Role is genuinely fractional — not disguised employment', 'Outcome evolves across quarters', 'Internal capability does not yet exist to absorb the role'],
    f: ['SOW refreshed every 90 days', 'Quarterly 360 reviews', 'Monthly day allocation agreed in advance', 'Exit-ready internal owner defined from the start']
  },
  {
    id: 'advisory', color: '#B87028', bg: '#FFF8F0', tc: '#7A4A12', name: 'Advisory', dur: 'Retained part-time',
    desc: 'Regular strategic input at board or senior team level. Fortnightly or monthly cadence.',
    r: ['Strategic input required — not operational delivery', 'Low day commitment, high-frequency contact', 'Board-level or senior leadership guidance needed', 'Specific expertise required on a recurring basis'],
    f: ['Retainer with agreed days per month', 'SOW based on outputs — not duties or presence', 'Fortnightly or monthly structured sessions', '360 evaluation at 90-day intervals']
  }
];

export default function Clients() {
  useReveal();
  const [sel, setSel] = useState(0);
  const t = ES_TYPES[sel];

  return (
    <div id="page-clients">
      <PageMeta
        title="For Organisations | Hire Fractional Experts via TWG Network"
        description="Buy the end of a problem, not a consultant. TWG Network matches organisations with senior interim and fractional experts across four engagement formats. 10% transparent fee."
      />
      <div className="client-hero">
        <div className="container">
          <span className="label" style={{ color: "rgba(255,255,255,.4)" }}>For organisations</span>
          <h1><span className="hero-line">Every consultant will tell you they can solve your problem.</span>{" "}<span className="hero-line"><em>TWG finds the person who already has.</em></span></h1>
          <p className="sub" style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "1.15rem", marginTop: "1.5rem" }}>Senior capability. Defined outcomes. No surprises.</p>
          <div className="hero-btns" style={{ marginTop: "2.5rem" }}>
            <Link href="/register" className="btn btn-amber" data-testid="link-register-hero">Tell us what you are trying to fix</Link>
          </div>
        </div>
      </div>

      <section style={{ background: "var(--paper)" }}>
        <div className="container">
          <span className="label reveal">Common Reasons Organisations Contact Us</span>
          <h2 className="reveal">The situations we<br />hear most often.</h2>
          <p className="reveal" style={{ maxWidth: "560px", opacity: ".72", marginBottom: "3rem" }}>These are not generic problems. They are the specific situations coming up in early conversations. If yours looks different, tell us — that is where we start.</p>
          <div className="how-list">
            <div className="how-item reveal">
              <div className="how-n" style={{ color: "var(--amber)", fontSize: "1.5rem" }}>01</div>
              <div className="how-text">
                <h4>You have hired for the same role twice</h4>
                <p>You have spent the money. The problem is still there. The issue probably is not your hiring process — it is that permanent employment is the wrong structure for what you actually need. Someone who has solved this specific problem before, with defined outcomes and a defined end date, is a different proposition entirely.</p>
              </div>
            </div>
            <div className="how-item reveal">
              <div className="how-n" style={{ color: "var(--amber)", fontSize: "1.5rem" }}>02</div>
              <div className="how-text">
                <h4>Your business has grown past what the current team can carry</h4>
                <p>Another permanent head is not the answer — not the cost, not the commitment, not the time it takes to find the right person and hope they work out. You need senior capability now. Someone who can step in, contribute from day one, and leave the function stronger than they found it.</p>
              </div>
            </div>
            <div className="how-item reveal">
              <div className="how-n" style={{ color: "var(--amber)", fontSize: "1.5rem" }}>03</div>
              <div className="how-text">
                <h4>You need senior resource now and do not have six months</h4>
                <p>You have a board to answer to, a timeline that does not move, and a gap that needs filling. A six-month recruitment process is not an option. A consultant who needs three months to understand your business is not an option. You need someone who has been here before.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--navy)", padding: "5rem 0" }}>
        <div className="container">
          <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
            <div style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.4rem,3vw,2.2rem)", fontWeight: 300, color: "#fff", lineHeight: "1.3", marginBottom: "1.5rem" }}>
              You are not buying a consultant.<br />You are buying the end of a problem<br /><em style={{ color: "var(--amber)" }}>you have probably already tried<br />and failed to fix once.</em>
            </div>
            <p style={{ color: "rgba(255,255,255,.6)", fontSize: ".95rem", lineHeight: "1.8", maxWidth: "520px", margin: "0 auto" }}>Every business owner has a bad consultant story. Scope creep. Vague deliverables. Invoices that keep coming. TWG offers what that market has never reliably delivered: certainty. The outcome is agreed before anyone starts. The person delivering it has done it before.</p>
          </div>
        </div>
      </section>

      <section className="how-steps">
        <div className="container">
          <span className="label reveal">From Challenge to Outcome</span>
          <h2 className="reveal">Tell us what you are trying to fix.<br />We take it from there.</h2>
          <div className="how-list">
            <div className="how-item reveal"><div className="how-n">1</div><div className="how-text"><h4>Describe your problem</h4><p>Not a job description. Not a person spec. The situation — what is broken, what you have already tried, what success looks like. The brief is where the match begins, and a clear brief produces a better outcome every time.</p></div></div>
            <div className="how-item reveal"><div className="how-n">2</div><div className="how-text"><h4>We introduce you to the right person</h4><p>TWG matches your brief against the network and introduces you to one or two practitioners who have solved this type of problem before. Verified track record. Real 360 score. Available to start. You meet them before you commit to anything.</p></div></div>
            <div className="how-item reveal"><div className="how-n">3</div><div className="how-text"><h4>Agree the outcome before anyone starts</h4><p>A Statement of Work is completed together — defined deliverables, agreed KPIs, timeline. Nothing begins without it. This replaces the vague engagement letter and the open-ended billing cycle.</p></div></div>
            <div className="how-item reveal"><div className="how-n">4</div><div className="how-text"><h4>Delivery and mutual accountability</h4><p>The engagement runs against what was agreed. At completion, both the practitioner and your organisation are evaluated. The 360 score is permanent, honest, and visible to future engagements on both sides.</p></div></div>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--paper)" }}>
        <div className="container-w">
          <span className="label reveal">Engagement formats</span>
          <h2 className="reveal">The right format<br />for the problem.</h2>
          <p className="reveal" style={{ opacity: ".72", maxWidth: "540px", marginBottom: "1.5rem" }}>Four formats are available — each with different timelines, cadence, and SOW requirements. Not sure which fits? We advise as part of the brief conversation.</p>
          <div className="es-grid" style={{ marginBottom: "1rem" }}>
            {ES_TYPES.map((type, i) => (
              <div
                key={type.id}
                className={`es-card ${i === sel ? 'active' : ''}`}
                onClick={() => setSel(i)}
                style={i === sel ? { background: type.bg, borderColor: type.color } : {}}
                data-testid={`card-engagement-${type.id}`}
              >
                <div className="es-type" style={{ color: i === sel ? type.color : 'var(--muted)' }}>{type.name}</div>
                <div className="es-name" style={{ color: i === sel ? type.tc : 'var(--navy)' }}>{type.dur}</div>
              </div>
            ))}
          </div>
          <div className="es-detail" style={{ background: t.bg, borderTop: `3px solid ${t.color}`, marginTop: "1rem", padding: "2rem" }}>
            <div style={{ gridColumn: "1/-1", marginBottom: ".5rem" }}>
              <div style={{ fontFamily: "var(--serif)", fontSize: "1.6rem", fontWeight: 300, color: t.tc, lineHeight: "1.1", marginBottom: ".4rem" }}>
                {t.name} <span style={{ color: "var(--muted)", fontSize: "1rem", fontStyle: "italic", marginLeft: ".5rem" }}>{t.dur}</span>
              </div>
              <div style={{ fontSize: ".92rem", color: "var(--ink)", opacity: ".85", maxWidth: "560px" }}>{t.desc}</div>
            </div>
            <div>
              <div className="es-detail-title" style={{ color: t.tc }}>Right when</div>
              {t.r.map((x, idx) => <div key={idx} className="es-item">{x}</div>)}
            </div>
            <div>
              <div className="es-detail-title" style={{ color: t.tc }}>Format requirements</div>
              {t.f.map((x, idx) => <div key={idx} className="es-item">{x}</div>)}
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--offwhite)" }}>
        <div className="container">
          <div className="commercial-inner reveal">
            <div><span className="big-stat">10%</span><div className="big-stat-label">Published on this page</div></div>
            <div>
              <span className="label">The commercial case</span>
              <h2 style={{ marginBottom: "1rem" }}>Less than a third of<br />what you are probably paying.</h2>
              <p>Traditional interim firms charge between 20 and 35 percent above the day rate. They do not publish it. You find out when you see the invoice. TWG charges 10%. For a practitioner at £1,000 per day over a 40-day engagement, that is a saving of up to £10,000 on a single brief compared with standard market rates.</p>
              <p style={{ marginTop: ".75rem" }}>That saving does not come from a lower calibre of practitioner. It comes from a model that does not need a large sales operation or a recruitment margin to sustain itself.</p>
              <p style={{ marginTop: ".75rem", fontSize: ".88rem", opacity: ".8" }}>A 5% introduction override and a 15% overall cap may apply. For full details, see our <Link href="/pricing" data-testid="link-fee-structure">complete fee structure</Link>.</p>
              <p style={{ marginTop: ".5rem", fontSize: ".82rem", opacity: ".6" }}>Figures are shown in pounds sterling. US pricing is available — the same fee structure applies in dollars.</p>
              <div style={{ marginTop: "1.5rem" }}>
                <Link href="/pricing" className="btn btn-outline-navy" data-testid="link-pricing">See the full fee structure</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="client-360">
        <div className="container client-360-grid">
          <div className="client-360-copy">
            <span className="label reveal">Mutual accountability</span>
            <h2 className="reveal">You are rated too.<br /><em>That is what makes<br />this different.</em></h2>
            <p className="reveal">Every practitioner in the network carries a 360 score built from real engagements, visible before any brief is accepted. So does every client organisation.</p>
            <p className="reveal client-360-closing">No other network holds organisations accountable in this way.</p>
          </div>

          <article className="client-score-card reveal" aria-label="Example verified client record">
            <header className="client-score-header">
              <div>
                <span>Client record · NG-2214</span>
                <h3>Northgate Group</h3>
              </div>
              <div className="client-score-verified" aria-label="Verified">Veri<br />fied</div>
            </header>
            <div className="client-score-body">
              <span className="client-score-label">360 score</span>
              <div className="client-score-summary">
                <strong>9.2</strong>
                <div className="client-score-bars" aria-hidden="true">
                  {[58, 78, 66, 86, 92].map((height, index) => (
                    <i key={index} style={{ height: `${height}%` }} />
                  ))}
                </div>
              </div>
              <dl className="client-score-metrics">
                <div><dt>Clarity of brief</dt><dd>9.4</dd></div>
                <div><dt>Responsiveness</dt><dd>8.8</dd></div>
                <div><dt>Conduct</dt><dd>9.1</dd></div>
                <div><dt>Paid on time</dt><dd>9.6</dd></div>
              </dl>
            </div>
            <footer className="client-score-footer">
              <span>34 engagements</span>
              <span>Updated 2 days ago</span>
            </footer>
          </article>
        </div>
      </section>

      <section id="where-we-operate" className="where-operate">
        <div className="container">
          <div className="where-operate-intro">
            <span className="label reveal">Where we operate</span>
            <h2 className="reveal">Across the functions<br />where problems live.</h2>
            <p className="reveal">TWG practitioners have operated at senior level across these functions. As the network grows we will be specific about what we have seen and what we have solved. Tell us your problem — that is where we start.</p>
          </div>
          <div className="where-operate-grid">
            {[
              ["01", "Finance", "CFO advisory, restructuring, M&A support, FP&A, cash management."],
              ["02", "Operations", "Transformation, cost reduction, supply chain, process design, P&L ownership."],
              ["03", "Technology", "Fractional CTO, platform strategy, architecture, digital transformation."],
              ["04", "Commercial", "Revenue growth, GTM strategy, sales leadership, commercial structure."],
              ["05", "People", "HR transformation, organisational design, leadership capability."],
            ].map(([number, title, text]) => (
              <div className="where-operate-card reveal" key={number}>
                <div className="where-operate-card-top"><span>{number}</span><span aria-hidden="true">→</span></div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
            <div className="where-operate-card where-operate-other reveal">
              <span className="label">Something else</span>
              <h3>Something else</h3>
              <p>Tell us. The most interesting matches often start here.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="client-cta tight">
        <div className="container">
          <h2>Tell us what you are trying to fix.</h2>
          <p className="sub">Describe the situation. We will tell you whether we have the person and how quickly we can introduce you.</p>
          <Link href="/register" className="btn btn-amber" data-testid="link-send-brief">Send us a brief</Link>
        </div>
      </section>
    </div>
  );
}
