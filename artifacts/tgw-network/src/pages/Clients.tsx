import { Link } from "wouter";
import { useReveal } from "@/hooks/useReveal";
import { useState } from "react";

const ES_TYPES = [
  { 
    id:'sprint', color:'#0C447C', bg:'#EEF5FC', tc:'#0C447C', name:'Sprint', dur:'15–30 days',
    desc:'Defined deliverable. Tight timeline. Best when the problem is clear and speed matters.',
    r:['Problem is clearly defined before you start','Outcome is measurable and agreed','Client has urgency — speed matters','Internal team can act once diagnosis is done'],
    f:['Single SOW with 3–5 KPIs maximum','Daily or every-other-day check-in cadence','Single deliverable at end — not phased','360 evaluation at completion only'] 
  },
  { 
    id:'project', color:'#085041', bg:'#F0FAF6', tc:'#085041', name:'Project', dur:'30–90 days',
    desc:'Phased delivery across a broader scope. Diagnosis, implementation, and internal handover.',
    r:['Problem spans multiple areas or functions','Implementation as well as diagnosis required','Internal capability needs building alongside delivery','Phased milestones make sense for the scope'],
    f:['SOW with defined phase milestones','Mid-point review at day 30–45','Weekly update to internal champion','360 review at each major milestone'] 
  },
  { 
    id:'ongoing', color:'#3C3489', bg:'#F5F4FE', tc:'#3C3489', name:'Ongoing', dur:'90+ days',
    desc:'Sustained fractional leadership. SOW refreshed quarterly. Exit criteria defined from day one.',
    r:['Sustained senior presence needed over time','Role is genuinely fractional — not disguised employment','Outcome evolves across quarters','Internal capability does not yet exist to absorb the role'],
    f:['SOW refreshed every 90 days','Quarterly 360 reviews','Monthly day allocation agreed in advance','Exit-ready internal owner defined from the start'] 
  },
  { 
    id:'advisory', color:'#B87028', bg:'#FFF8F0', tc:'#7A4A12', name:'Advisory', dur:'Retained part-time',
    desc:'Regular strategic input at board or senior team level. Fortnightly or monthly cadence.',
    r:['Strategic input required — not operational delivery','Low day commitment, high-frequency contact','Board-level or senior leadership guidance needed','Specific expertise required on a recurring basis'],
    f:['Retainer with agreed days per month','SOW based on outputs — not duties or presence','Fortnightly or monthly structured sessions','360 evaluation at 90-day intervals'] 
  }
];

export default function Clients() {
  useReveal();
  const [sel, setSel] = useState(0);
  const t = ES_TYPES[sel];

  return (
    <div id="page-clients">
      <div className="client-hero">
        <div className="container">
          <span className="label" style={{ color: "rgba(255,255,255,.5)" }}>For Organisations</span>
          <h1>Senior capability, deployed surgically.</h1>
          <p className="sub">Access operators who have solved your problem before. No discovery phases. No junior teams learning on your time. Just the exact capability you need, managed through a governed framework.</p>
        </div>
      </div>
      
      <section className="commercial">
        <div className="container">
          <span className="label reveal">Engagement Framework</span>
          <h2 className="reveal">How you engage.</h2>
          
          <div className="es-grid reveal mt-6">
            {ES_TYPES.map((type, i) => (
              <div 
                key={type.id}
                className={`es-card ${i === sel ? 'active' : ''}`} 
                onClick={() => setSel(i)}
                style={i === sel ? { background: type.bg, borderColor: type.color } : {}}
              >
                <div className="es-type" style={{ color: i === sel ? type.color : 'var(--muted)' }}>{type.name}</div>
                <div className="es-name" style={{ color: i === sel ? type.tc : 'var(--navy)' }}>{type.dur}</div>
              </div>
            ))}
          </div>

          <div className="es-detail reveal" style={{ background: t.bg, borderTop: `3px solid ${t.color}`, marginTop: "1rem", padding: "2rem" }}>
            <div style={{ gridColumn: "1/-1", marginBottom: ".5rem" }}>
              <div style={{ fontFamily: "var(--serif)", fontSize: "1.6rem", fontWeight: "300", color: t.tc, lineHeight: "1.1", marginBottom: ".4rem" }}>
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

      <section className="client-cta">
        <div className="container-n">
          <h2 className="reveal">Tell us what you are trying to fix.</h2>
          <p className="sub reveal">Start with the problem, not the person spec. The more clearly you describe the situation, the faster we can match you.</p>
          <Link href="/register" className="btn btn-amber reveal mt-4">Register a brief</Link>
        </div>
      </section>
    </div>
  );
}
