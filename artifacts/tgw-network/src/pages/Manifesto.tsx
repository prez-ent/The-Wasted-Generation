import { Link } from "wouter";
import { useReveal } from "@/hooks/useReveal";

export default function Manifesto() {
  useReveal();

  return (
    <div id="page-manifesto">
      <div style={{ background: "var(--navy)", padding: "5rem 0 4rem" }}>
        <div className="container-n">
          <span className="label" style={{ color: "rgba(255,255,255,.4)" }}>The Manifesto</span>
          <h1 style={{ color: "#fff", fontSize: "clamp(1.8rem,4vw,2.8rem)", maxWidth: "640px", lineHeight: "1.15" }}>
            Why businesses are throwing away their most valuable asset — and what it is costing them.
          </h1>
          <p style={{ color: "rgba(255,255,255,.5)", marginTop: "1.5rem", fontSize: ".9rem" }}>
            Andrew Engledow, Founder · The Wasted Generation
          </p>
        </div>
      </div>
      <section style={{ background: "var(--paper)" }}>
        <div className="container-n">
          <div style={{ maxWidth: "660px", fontSize: "1.05rem", lineHeight: "1.85", color: "var(--ink)" }}>
            <p style={{ fontSize: "1.15rem", fontFamily: "var(--serif)", fontWeight: "300", lineHeight: "1.65", color: "var(--navy)", marginBottom: "2rem" }}>
              In 2015 Hollywood made a film about this problem. <em>The Intern</em> starred Robert De Niro as a 70-year-old retired executive who becomes a senior intern at a fast-growing startup. He wins over the entire company with his wisdom, his calm, and his complete absence of agenda. It grossed $195 million. People loved it because it felt true.
            </p>
            <p>Then the credits rolled. And business went back to doing exactly what the film was quietly criticising.</p>
            <p>This is not a feel-good story. This is a systemic failure. And it is costing businesses far more than they realise.</p>
            
            <h2 style={{ fontSize: "1.5rem", color: "var(--navy)", margin: "2.5rem 0 1rem", fontWeight: "400" }}>What is actually happening</h2>
            <p>There is a generation of professionals in their sixties right now with 30, 35, sometimes 40 years of hard-won, battle-tested commercial experience. They have navigated recessions, restructures, failed product launches, hostile clients, and broken pipelines. They have made the big calls. They have lived with the consequences. They know what they don't know — which is the most commercially valuable form of knowledge there is.</p>
            <p>And businesses are filtering them out before they even get to the room.</p>
            <p>78 percent of older workers have seen or experienced age discrimination in the workplace. That is not a fringe complaint. That is the majority. And the code words are always the same. <em>Overqualified. Looking for someone with more growth potential. Needs someone who will grow into the role.</em></p>
            <p>What that actually means is: your experience makes us uncomfortable.</p>
            
            <div style={{ borderLeft: "3px solid var(--amber)", padding: "1.5rem 2rem", margin: "2.5rem 0", background: "var(--l-amber)" }}>
              <p style={{ fontFamily: "var(--serif)", fontSize: "1.2rem", fontWeight: "300", lineHeight: "1.65", color: "var(--navy)", margin: 0 }}>
                The most experienced operators available are being filtered out in favour of the least experienced options. And the businesses doing the filtering are paying for it in slower decisions, wrong turns, and missed growth.
              </p>
            </div>
            
            <h2 style={{ fontSize: "1.5rem", color: "var(--navy)", margin: "2.5rem 0 1rem", fontWeight: "400" }}>The data is unambiguous</h2>
            <p>A 2021 systematic review of 74 independent research studies found no difference in productivity between older and younger workers. Not marginal. No difference.</p>
            <p>Research from AARP and the OECD shows that a 10-percentage-point increase in workers over 50 is associated with roughly 1.1 percent higher productivity across the firm.</p>
            <p>AARP and The Economist Intelligence Unit estimate age discrimination cost the US economy $850 billion in lost productivity in 2018 alone. That figure is projected to reach $3.9 trillion by 2050.</p>
            <p>McKinsey estimates a $6.2 trillion annual global GDP opportunity from keeping experienced workers active and engaged.</p>
            <p>Companies with age-diverse management teams generate 19 percent higher innovation profits.</p>
            <p>Workers aged 50 to 60 average 15 years of tenure. 65 percent of Gen Z leave within 12 months.</p>
            <p>This is not a marginal issue. This is one of the most expensive structural mistakes businesses make. And they keep making it.</p>
            
            <h2 style={{ fontSize: "1.5rem", color: "var(--navy)", margin: "2.5rem 0 1rem", fontWeight: "400" }}>What this generation actually offers</h2>
            <p>The pattern recognition that comes from 30 or 40 years in the room cannot be replicated by enthusiasm, a good degree, or an AI tool. It comes from having seen the same problem six times, in three sectors, across two continents. Knowing not just what to do but what not to do. Knowing where the shortcuts lead.</p>
            <p>Crucially, this generation is not building empires. They are not chasing titles. They have already had the career. What they want now is a hard problem, a business that is serious about solving it, and the satisfaction of leaving something running better than they found it.</p>
            <p>Businesses will spend six figures on a consultancy that sends in a 28-year-old with a framework learned in a classroom. But they will hesitate to bring in someone who has actually lived through the problem, solved it at scale, and can start contributing on day one without a discovery phase.</p>
            
            <div style={{ borderLeft: "3px solid var(--teal)", padding: "1.25rem 2rem", margin: "2.5rem 0", background: "var(--l-teal)" }}>
              <p style={{ fontSize: ".95rem", color: "var(--teal)", fontStyle: "italic", margin: 0 }}>
                "Many of us share a desire to simply solve problems without the need for huge fanfare or long-term commitments." — Pat Butler, founding cohort member
              </p>
            </div>
            
            <h2 style={{ fontSize: "1.5rem", color: "var(--navy)", margin: "2.5rem 0 1rem", fontWeight: "400" }}>The cost of getting it wrong</h2>
            <p>SHRM estimates the cost of a bad hire at between 50 and 200 percent of annual salary. For a senior role, that is a six-figure mistake, plus lost time, lost momentum, and the cost of starting again.</p>
            <p>The businesses most at risk are the ones that keep hiring the same profile and wondering why the same problems persist. They are not short of talent. They are short of the right kind of experience applied to the right kind of problem.</p>
            <p>And the solution is sitting right in front of them, being filtered out by the same hiring systems that are causing the problem.</p>
            
            <h2 style={{ fontSize: "1.5rem", color: "var(--navy)", margin: "2.5rem 0 1rem", fontWeight: "400" }}>This is not just a business story</h2>
            <p>Age-related professional exclusion has a human cost that extends well beyond the P&L. Skilled people who built careers, led teams, and created real commercial value are being rendered invisible almost overnight. The mental health consequences are significant. The social isolation is real. The loss of identity that comes from arbitrary exclusion from the workforce is one of the least-discussed public health challenges in the UK.</p>
            <p>Younger professionals have a stake in this too. When the knowledge transfer breaks down — when the generation that has seen everything stops being asked — it is the next generation that pays the price in avoidable mistakes and repeated lessons.</p>
            
            <h2 style={{ fontSize: "1.5rem", color: "var(--navy)", margin: "2.5rem 0 1rem", fontWeight: "400" }}>What the right model looks like</h2>
            <p>The Wasted Generation is a governed network that connects businesses with experienced professionals to provide value that younger people simply cannot yet provide.</p>
            <p>The register is curated. Professionals are vetted by track record, sector, and the type of problem they have solved — not by age, tenure dates, or job titles.</p>
            <p>Engagements are fixed-term. Clean in, clean out. No permanent headcount implications. No empire building. Typically two to three months with a defined problem, agreed deliverables, and knowledge transfer built in from day one.</p>
            <p>Matching is done on the basis of the problem, not the profile. What does the business actually need fixed? Who has solved that before?</p>
            <p>The review system is mutual. Businesses review the professional. The professional reviews the business. Both reviews are transparent. This is not a recruitment agency. It is not a job board. It is a platform built on openness, transparency, and fairness to both sides — with collective good as the governing principle.</p>
            
            <div style={{ background: "var(--navy)", padding: "2.5rem", margin: "3rem 0" }}>
              <h3 style={{ color: "var(--amber)", fontFamily: "var(--serif)", fontSize: "1.3rem", fontWeight: "300", marginBottom: "1rem" }}>A call to businesses</h3>
              <p style={{ color: "rgba(255,255,255,.8)", fontSize: ".95rem", marginBottom: 0 }}>
                If you are leading a business with a problem the standard playbook has not fixed — a stalled pipeline, a relationship breakdown, a strategic pivot that keeps losing momentum — you may already have the answer available to you. You are just not looking in the right place. The founding cohort is forming now. Available for fixed-term engagements. Ready to start.
              </p>
            </div>
            
            <div style={{ background: "var(--offwhite)", padding: "2.5rem", marginBottom: "3rem" }}>
              <h3 style={{ color: "var(--teal)", fontFamily: "var(--serif)", fontSize: "1.3rem", fontWeight: "300", marginBottom: "1rem" }}>A call to experienced professionals</h3>
              <p style={{ fontSize: ".95rem", marginBottom: 0 }}>
                If you recognise this story — if you have found yourself filtered out before you got to the room, told you are overqualified for problems you have solved before — this platform is being built for you. The founding cohort is forming now. One paragraph. What problem do you solve. What did it cost the business that ignored you.
              </p>
            </div>
            
            <hr style={{ border: "none", borderTop: "1px solid var(--rule)", marginBottom: "2rem" }} />
            <p style={{ fontSize: ".88rem", opacity: ".6" }}>
              Andrew Engledow is the founder of The Wasted Generation. Thirty years of senior commercial experience across regulated technology markets in EMEA, APAC, and North America. Deals closed north of £29 million.
            </p>
            
            <div style={{ marginTop: "2.5rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/apply" className="btn btn-amber">Apply as a practitioner</Link>
              <Link href="/register" className="btn btn-outline-navy">Register a company</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
