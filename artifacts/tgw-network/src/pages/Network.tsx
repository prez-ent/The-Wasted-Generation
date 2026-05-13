import { Link } from "wouter";
import { useReveal } from "@/hooks/useReveal";
import { useState } from "react";

const PRINCIPLES = [
  { 
    num:'01', name:'Collaboration', color:'#085041', bg:'#F0FAF6',
    statement:'We actively make each other better. The economics of the network are designed so that helping someone else succeed means you succeed too.',
    i:['Peer introduction overrides — paid','Company introduction overrides — lifetime','Reputation built across the network'],
    a:['Self-promotion at the cost of peers','Hoarding clients or knowledge','Treating colleagues as competition'],
    d:['No fees on internal peer referrals','5% override paid to introducers','Public recognition of strong contributors'],
    hl:'Helping someone else succeed earns you income.',
    sub:'Most networks pay lip service. This one writes it into the fee schedule.' 
  },
  { 
    num:'02', name:'Approachability', color:'#0C447C', bg:'#EEF5FC',
    statement:'No hierarchy, no gatekeeping. The network team is reachable as people, not a brand voice. Practitioners and clients are addressable directly.',
    i:['Direct contact with the network team','Practitioners contactable through profile','First-name basis — internal and external'],
    a:['Ticketing systems and queue numbers','Hiding behind a brand voice','Slow scripted replies'],
    d:['Email reply within one working day','Calls offered when useful','Founder reachable directly'],
    hl:'No ticket numbers. No bots. Andrew picks up the phone.',
    sub:'If you have to ask who to talk to, we have already failed.' 
  },
  { 
    num:'03', name:'Mutual benefit', color:'#B87028', bg:'#FFF8F0',
    statement:'This only works if it works for everyone. Not mostly for the platform, not mostly for clients, not mostly for practitioners — for every party, fairly.',
    i:['Practitioner keeps 100% of rate','Client pays a published, modest fee','Network funded by transparent margin'],
    a:['Extracting value at one side\'s expense','Hidden fees on either party','Bidding wars or rate suppression'],
    d:['Fee additive — never deducted from practitioner','Fee published on the website','Caps on total override to protect clients'],
    hl:'Practitioner. Client. Network. Three winners — or no deal.',
    sub:'The economics are designed so no party loses for another to gain.' 
  },
  { 
    num:'04', name:'Transparency', color:'#1E2D40', bg:'#F7F7F7',
    statement:'Fees published. Ratings visible. Process explained. If you have to ask, we have already failed.',
    i:['Fees on the pricing page','360 scores visible before engagement','Match reasoning shared with both sides'],
    a:['Rates "on application"','Hidden commission structures','Vague engagement letters'],
    d:['Pricing page lists every fee and example','Both sides see scores before commitment','Audit trail on every introduction'],
    hl:'10%. Not "rates on application". Not "depends".',
    sub:'Published in the same place for every visitor. Forever.' 
  },
  { 
    num:'05', name:'Openness', color:'#3C3489', bg:'#F5F4FE',
    statement:'We are building this with the people in it, not for them. Your challenge is welcome. The model evolves with the network.',
    i:['Founding cohort shapes the model','Quarterly member forums','Network team open to scrutiny'],
    a:['"Take it or leave it" platform terms','Closed-door governance','Members as passive consumers'],
    d:['Public roadmap','Member-elected representation as cohort grows','Annual review of every governance rule'],
    hl:'You are not a user. You are a member.',
    sub:'The platform is built with the cohort, not deployed onto them.' 
  }
];

const PRACTITIONERS = [
  { 
    initials:'JM', color:'#0C447C', name:'J. Marshall', role:'Fractional CFO · Regulated industries', avail:'now', tags:['Finance','Restructuring','M&A'], spec:'Finance',
    stars:4.8, eng:23, kpi:96, repeat:87,
    bio:'30 years senior finance leadership in regulated technology and financial services. Specialises in cash management, restructuring, and M&A support for businesses between £20m and £200m revenue.',
    terms:['Project · 30–90 days','£1,200–£1,800 / day','Remote + onsite London/SE'] 
  },
  { 
    initials:'PR', color:'#085041', name:'P. Rashid', role:'Operations Director · Manufacturing & supply chain', avail:'2 weeks', tags:['Operations','Supply chain'], spec:'Operations',
    stars:4.9, eng:18, kpi:94, repeat:78,
    bio:'Built and turned around operations functions across automotive, FMCG, and industrial manufacturing in EMEA and APAC. Track record of cost reduction without compromising service.',
    terms:['Sprint or Project','£1,000–£1,400 / day','EMEA / APAC available'] 
  },
  { 
    initials:'SK', color:'#3C3489', name:'S. Khan', role:'Fractional CTO · Platform & scale', avail:'now', tags:['Technology','Architecture','Scale-up'], spec:'Technology',
    stars:4.7, eng:14, kpi:91, repeat:71,
    bio:'Scaled engineering organisations from 10 to 200+ across two unicorns. Pragmatic about architecture trade-offs. Particularly strong on technology strategy at Series B/C inflection points.',
    terms:['Ongoing 2–3 days/week','£1,400–£2,000 / day','UK + US time zones'] 
  },
  { 
    initials:'EH', color:'#B87028', name:'E. Hartley', role:'Commercial Director · GTM transformation', avail:'now', tags:['Commercial','GTM','SaaS'], spec:'Commercial',
    stars:4.8, eng:21, kpi:93, repeat:81,
    bio:'25 years building and turning around commercial functions. Specialises in GTM redesign, sales leadership in transition, and quota model overhauls. Strongest with £10m–£80m ARR businesses.',
    terms:['Sprint or Project','£1,100–£1,600 / day','UK / EMEA'] 
  },
  { 
    initials:'MD', color:'#0C447C', name:'M. Donnelly', role:'Fractional CFO · PE & growth', avail:'4 weeks', tags:['Finance','Private equity'], spec:'Finance',
    stars:4.9, eng:31, kpi:97, repeat:89,
    bio:'Former Big Four partner with 15 years on the operator side. Specialises in CFO support during PE ownership transitions, exit preparation, and integration finance.',
    terms:['Project · 60–120 days','£1,500–£2,200 / day','UK / US'] 
  },
  { 
    initials:'LN', color:'#085041', name:'L. Nakamura', role:'Operations · Transformation lead', avail:'now', tags:['Operations','Transformation'], spec:'Operations',
    stars:4.6, eng:12, kpi:90, repeat:66,
    bio:'Specialises in operational transformation at the £20m–£150m revenue band — particularly post-acquisition integrations and process redesign in services businesses.',
    terms:['Project · 45–90 days','£900–£1,300 / day','Remote + 2 days/week onsite'] 
  }
];

export default function Network() {
  useReveal();
  
  const [pcSel, setPcSel] = useState(0);
  const p = PRINCIPLES[pcSel];

  const [fwTab, setFwTab] = useState('prac');
  
  const [psFilter, setPsFilter] = useState('All');
  const [psModal, setPsModal] = useState<number | null>(null);

  const filteredPractitioners = PRACTITIONERS.filter(prac => {
    if(psFilter === 'All') return true;
    if(psFilter === 'Available now') return prac.avail === 'now';
    return prac.spec === psFilter;
  });

  return (
    <div id="page-network">
      <div className="network-hero">
        <div className="container">
          <span className="label" style={{ color: "var(--navy)" }}>The Network</span>
          <h1>A governed ecosystem.</h1>
          <p className="sub">TGW Network operates on a clear set of principles, supported by a structured 360 review framework and transparent governance.</p>
        </div>
      </div>
      
      <section style={{ background: "var(--paper)" }}>
        <div className="container">
          <span className="label reveal">Core principles</span>
          <h2 className="reveal">The rules of the game.</h2>
          <div className="pc-pills reveal mt-6">
            {PRINCIPLES.map((prin, i) => (
              <div 
                key={prin.num}
                className={`pc-pill ${i === pcSel ? 'active' : ''}`}
                onClick={() => setPcSel(i)}
                style={i === pcSel ? { background: prin.color, color: "#fff", borderColor: prin.color } : {}}
              >
                {prin.name}
              </div>
            ))}
          </div>
          
          <div className="reveal" style={{ background: p.bg, padding: "2rem", borderLeft: `3px solid ${p.color}` }}>
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
          
          <div className="pc-nav reveal">
            <button 
              className="pc-nav-btn" 
              disabled={pcSel === 0} 
              onClick={() => setPcSel(Math.max(0, pcSel - 1))}
            >
              Previous
            </button>
            <div className="pc-progress">
              {PRINCIPLES.map((_, i) => (
                <div 
                  key={i} 
                  className={`pc-dot ${i === pcSel ? 'active' : ''}`} 
                  onClick={() => setPcSel(i)}
                  style={i === pcSel ? { background: p.color } : {}}
                ></div>
              ))}
            </div>
            <button 
              className="pc-nav-btn" 
              disabled={pcSel === PRINCIPLES.length - 1} 
              onClick={() => setPcSel(Math.min(PRINCIPLES.length - 1, pcSel + 1))}
            >
              Next
            </button>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--offwhite)" }}>
        <div className="container">
          <span className="label reveal">The Framework</span>
          <h2 className="reveal">The 360 evaluation system.</h2>
          <div className="fw-tabs reveal mt-6">
            <button className={`fw-tab ${fwTab === 'prac' ? 'active' : ''}`} onClick={() => setFwTab('prac')}>Practitioner evaluation</button>
            <button className={`fw-tab ${fwTab === 'client' ? 'active' : ''}`} onClick={() => setFwTab('client')}>Client evaluation</button>
            <button className={`fw-tab ${fwTab === 'mean' ? 'active' : ''}`} onClick={() => setFwTab('mean')}>What scores mean</button>
            <button className={`fw-tab ${fwTab === 'thresh' ? 'active' : ''}`} onClick={() => setFwTab('thresh')}>Thresholds</button>
          </div>

          {fwTab === 'prac' && (
            <div className="fw-panel active reveal">
              <div className="fw-ind">Clients score the practitioner out of 5 across three dimensions at the end of each engagement (or quarterly for ongoing roles).</div>
              <table className="fw-table">
                <thead><tr><th>Dimension</th><th>What is measured</th></tr></thead>
                <tbody>
                  <tr><td className="fw-dim">KPI Delivery</td><td>Did they hit the agreed metrics in the SOW? (1 = Missed entirely, 5 = Delivered early/exceeded)</td></tr>
                  <tr><td className="fw-dim">Knowledge Transfer</td><td>Is the internal team better equipped now than when they arrived?</td></tr>
                  <tr><td className="fw-dim">Cultural Friction</td><td>Did they integrate well, or did they cause unnecessary disruption?</td></tr>
                </tbody>
              </table>
              <div style={{ fontSize: ".85rem", opacity: ".75" }}>The average of these three scores becomes the engagement score. The practitioner's overall 360 score is the rolling average of their last 10 engagements.</div>
            </div>
          )}

          {fwTab === 'client' && (
            <div className="fw-panel active reveal">
              <div className="fw-ind">Practitioners score the client out of 5 across three dimensions. This protects the network from toxic environments.</div>
              <table className="fw-table">
                <thead><tr><th>Dimension</th><th>What is measured</th></tr></thead>
                <tbody>
                  <tr><td className="fw-dim">Clarity</td><td>Did the problem described match the reality on the ground?</td></tr>
                  <tr><td className="fw-dim">Autonomy</td><td>Were they given the authority needed to deliver the outcome?</td></tr>
                  <tr><td className="fw-dim">Friction</td><td>Was the internal environment collaborative or resistant?</td></tr>
                </tbody>
              </table>
              <div style={{ fontSize: ".85rem", opacity: ".75" }}>Client scores are visible to practitioners before they accept an engagement. A consistently low-scoring client will struggle to attract the best operators.</div>
            </div>
          )}

          {fwTab === 'mean' && (
            <div className="fw-panel active reveal">
              <div className="fw-score-grid">
                <div className="fw-sc"><div className="fw-sc-val" style={{ color: "#A32D2D" }}>&lt; 3.5</div><div className="fw-sc-lbl">Poor</div><div className="fw-sc-desc">Review triggered. Likely removal from network.</div></div>
                <div className="fw-sc"><div className="fw-sc-val" style={{ color: "var(--amber)" }}>3.5–4.0</div><div className="fw-sc-lbl">Acceptable</div><div className="fw-sc-desc">Delivered basics but room for improvement.</div></div>
                <div className="fw-sc"><div className="fw-sc-val" style={{ color: "var(--teal)" }}>4.0–4.5</div><div className="fw-sc-lbl">Strong</div><div className="fw-sc-desc">Hit KPIs, good integration, solid outcome.</div></div>
                <div className="fw-sc"><div className="fw-sc-val" style={{ color: "var(--blue)" }}>4.5–4.8</div><div className="fw-sc-lbl">Excellent</div><div className="fw-sc-desc">Exceeded expectations. Highly recommended.</div></div>
                <div className="fw-sc"><div className="fw-sc-val" style={{ color: "var(--navy)" }}>4.9–5.0</div><div className="fw-sc-lbl">Exceptional</div><div className="fw-sc-desc">Transformative impact on the business.</div></div>
              </div>
            </div>
          )}

          {fwTab === 'thresh' && (
            <div className="fw-panel active reveal">
              <div className="fw-thresh">
                <div className="fw-badge" style={{ background: "#F0FAF6", color: "var(--teal)" }}>&gt; 4.0</div>
                <div className="fw-thresh-text"><strong>Standard retention.</strong> Members maintaining an average above 4.0 remain in the network automatically.</div>
              </div>
              <div className="fw-thresh">
                <div className="fw-badge" style={{ background: "#FFF8F0", color: "var(--amber)" }}>&lt; 4.0</div>
                <div className="fw-thresh-text"><strong>Review threshold.</strong> Two consecutive engagements under 4.0 triggers a review by the governance committee.</div>
              </div>
              <div className="fw-thresh">
                <div className="fw-badge" style={{ background: "#FDF0ED", color: "#A32D2D" }}>&lt; 3.5</div>
                <div className="fw-thresh-text"><strong>Removal threshold.</strong> Any engagement scoring under 3.5 requires immediate network review. Multiple scores under 3.5 result in removal.</div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section>
        <div className="container">
          <span className="label reveal">The Register</span>
          <h2 className="reveal">Practitioner search.</h2>
          <div className="ps-filters reveal">
            {['All', 'Operations', 'Technology', 'Finance', 'Commercial', 'Available now'].map(o => (
              <div 
                key={o}
                className={`ps-chip ${psFilter === o ? 'active' : ''}`}
                onClick={() => setPsFilter(o)}
              >
                {o}
              </div>
            ))}
          </div>

          <div className="ps-grid reveal">
            {filteredPractitioners.length > 0 ? (
              filteredPractitioners.map((p, i) => (
                <div key={i} className="ps-card" onClick={() => setPsModal(PRACTITIONERS.indexOf(p))}>
                  <div className="ps-top">
                    <div className="ps-avatar" style={{ background: p.color }}>{p.initials}</div>
                    <div style={{ flex: 1 }}>
                      <div className="ps-name">{p.name}</div>
                      <div className="ps-role">{p.role}</div>
                      <div className="ps-avail" style={{ color: p.avail === 'now' ? 'var(--teal)' : 'var(--amber)' }}>
                        <span className="ps-avail-dot" style={{ background: p.avail === 'now' ? 'var(--teal)' : 'var(--amber)' }}></span>
                        {p.avail === 'now' ? 'Available now' : `Available in ${p.avail}`}
                      </div>
                    </div>
                  </div>
                  <div className="ps-tags">{p.tags.map(t => <div key={t} className="ps-tag">{t}</div>)}</div>
                  <div className="ps-stats">
                    <div className="ps-stat"><div className="ps-sv">{p.stars} <span className="ps-star">★</span></div><div className="ps-sl">360 score</div></div>
                    <div className="ps-stat"><div className="ps-sv">{p.eng}</div><div className="ps-sl">Engagements</div></div>
                    <div className="ps-stat"><div className="ps-sv">{p.kpi}%</div><div className="ps-sl">KPI hit</div></div>
                    <div className="ps-stat"><div className="ps-sv">{p.repeat}%</div><div className="ps-sl">Repeat</div></div>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ gridColumn: "1/-1", padding: "2rem", textAlign: "center", color: "var(--muted)" }}>No practitioners match this filter.</div>
            )}
          </div>

          <div className="ps-gate reveal">
            <p>Full practitioner profiles, including complete work history, verified 360 reviews, and detailed outcome studies are available to registered organisations.</p>
            <Link href="/register" className="btn btn-outline-white">Register to view full profiles</Link>
          </div>
        </div>
      </section>

      {psModal !== null && (
        <div className="modal-overlay open" onClick={(e) => { if ((e.target as HTMLElement).classList.contains('modal-overlay')) setPsModal(null); }}>
          <div className="modal-content">
            <button className="modal-close" onClick={() => setPsModal(null)}>×</button>
            <div className="ps-top" style={{ marginBottom: "1.5rem" }}>
              <div className="ps-avatar" style={{ width: "64px", height: "64px", fontSize: "1.2rem", background: PRACTITIONERS[psModal].color }}>{PRACTITIONERS[psModal].initials}</div>
              <div>
                <div className="ps-name" style={{ fontSize: "1.4rem" }}>{PRACTITIONERS[psModal].name}</div>
                <div className="ps-role" style={{ fontSize: ".9rem", marginBottom: "8px" }}>{PRACTITIONERS[psModal].role}</div>
                <div className="ps-avail" style={{ color: PRACTITIONERS[psModal].avail === 'now' ? 'var(--teal)' : 'var(--amber)' }}>
                  <span className="ps-avail-dot" style={{ background: PRACTITIONERS[psModal].avail === 'now' ? 'var(--teal)' : 'var(--amber)' }}></span>
                  {PRACTITIONERS[psModal].avail === 'now' ? 'Available now' : `Available in ${PRACTITIONERS[psModal].avail}`}
                </div>
              </div>
            </div>
            <div style={{ fontSize: ".95rem", lineHeight: "1.7", marginBottom: "2rem", opacity: ".85" }}>{PRACTITIONERS[psModal].bio}</div>
            <div style={{ display: "flex", gap: "2rem", borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)", padding: "1.25rem 0", marginBottom: "2rem" }}>
              <div className="ps-kpi"><div style={{ fontFamily: "var(--serif)", fontSize: "1.8rem", color: "var(--amber)", lineHeight: "1" }}>{PRACTITIONERS[psModal].stars} ★</div><div style={{ fontSize: ".72rem", textTransform: "uppercase", letterSpacing: ".05em", color: "var(--muted)", marginTop: "4px" }}>360 score</div></div>
              <div className="ps-kpi"><div style={{ fontFamily: "var(--serif)", fontSize: "1.8rem", color: "var(--navy)", lineHeight: "1" }}>{PRACTITIONERS[psModal].kpi}%</div><div style={{ fontSize: ".72rem", textTransform: "uppercase", letterSpacing: ".05em", color: "var(--muted)", marginTop: "4px" }}>KPI delivery</div></div>
              <div className="ps-kpi"><div style={{ fontFamily: "var(--serif)", fontSize: "1.8rem", color: "var(--navy)", lineHeight: "1" }}>{PRACTITIONERS[psModal].repeat}%</div><div style={{ fontSize: ".72rem", textTransform: "uppercase", letterSpacing: ".05em", color: "var(--muted)", marginTop: "4px" }}>Repeat clients</div></div>
            </div>
            <div style={{ fontSize: ".7rem", textTransform: "uppercase", letterSpacing: ".08em", fontWeight: "700", marginBottom: "12px", color: "var(--navy)" }}>Engagement terms</div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {PRACTITIONERS[psModal].terms.map(t => <div key={t} className="ps-tag" style={{ padding: "6px 12px" }}>{t}</div>)}
            </div>
            <div style={{ marginTop: "2.5rem" }}>
              <Link href="/register" className="btn btn-amber" style={{ width: "100%", textAlign: "center" }}>Register to request introduction</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
