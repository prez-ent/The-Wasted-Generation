import { Link } from "wouter";
import { useReveal } from "@/hooks/useReveal";
import { PageMeta } from "@/components/PageMeta";

export default function Home() {
  useReveal();
  return (
    <div id="page-home">
      <PageMeta
        title="The Wasted Generation | Fractional Consultants & Interim Experts"
        description="TWG Network connects businesses with senior fractional consultants and interim experts who have already solved the problem you're facing. 10% transparent fee, no markups."
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "https://twgnetwork.com/#organization",
              "name": "The Wasted Generation",
              "alternateName": "TWG Network",
              "url": "https://twgnetwork.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://twgnetwork.com/opengraph.jpg"
              },
              "description": "TWG Network connects businesses with senior fractional consultants and interim experts who have already solved the problem you're facing. 10% transparent fee, no markups.",
              "founder": {
                "@type": "Person",
                "name": "Andrew Engledow"
              }
            },
            {
              "@type": "WebSite",
              "@id": "https://twgnetwork.com/#website",
              "url": "https://twgnetwork.com",
              "name": "TWG Network — The Wasted Generation",
              "publisher": {
                "@id": "https://twgnetwork.com/#organization"
              }
            }
          ]
        }}
      />
      <div className="home-hero">
        <div className="container">
          <div className="hero-eyebrow">TWG Network</div>
          <h1><span className="hero-line">Every business problem has been solved before. We connect you with the people who have already solved it.</span></h1>
          <p className="sub">TWG is a curated network of proven executives, specialists, and transformation leaders. We connect organisations facing complex business challenges with practitioners who have already solved those exact problems — backed by defined outcomes, transparent pricing, and mutual accountability.</p>
          <div className="hero-btns">
            <Link href="/clients" className="btn btn-amber" data-testid="link-org-problem">My organisation has a problem</Link>
            <Link href="/practitioners" className="btn btn-outline-white" data-testid="link-practitioner">I am a practitioner</Link>
          </div>
        </div>
      </div>

      <section style={{ background: "var(--paper)" }}>
        <div className="container">
          <span className="label reveal">How It Works</span>
          <div className="what-grid">
            <div className="what-col reveal">
              <h3>We match. We introduce. We deploy.</h3>
              <p>Describe your challenge, and we will identify a practitioner who has delivered the same outcome. We manage the introduction, define the scope, and align expectations before work begins. No marketplace to browse. No CVs to filter. TWG does the work.</p>
            </div>
            <div className="what-col reveal">
              <h3>Outcomes defined before anyone starts</h3>
              <p>Every engagement begins with a signed Statement of Work — agreed KPIs, timeline, deliverables. You know exactly what you are getting before the first day is billed. No surprises on either side.</p>
            </div>
            <div className="what-col reveal">
              <h3>Accountability runs both ways</h3>
              <p>Both sides evaluate each other at the end of every engagement, building a permanent reputation that improves every future match. Every practitioner carries a verified 360 score. So does every client organisation. That is what makes the outcomes real.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pathways">
        <div className="container">
          <span className="label reveal">Two pathways</span>
          <div className="pathway-grid">
            <div className="pathway-card reveal">
              <div style={{ height: "4px", background: "var(--blue)" }}></div>
              <div className="pathway-body">
                <h3>For organisations</h3>
                <p style={{ fontSize: ".92rem", opacity: ".8", marginBottom: "1rem" }}>You have a problem that needs solving. The person who has already solved it is in this network.</p>
                <ul>
                  <li>We match you — no browsing, no filtering</li>
                  <li>Senior capability from day one, no ramp-up</li>
                  <li>Outcome agreed before anyone starts</li>
                  <li>10% — published on this page, not hidden in an invoice</li>
                </ul>
                <Link href="/clients" className="btn btn-blue" data-testid="link-clients-more">See how we work</Link>
              </div>
            </div>
            <div className="pathway-card reveal">
              <div style={{ height: "4px", background: "var(--teal)" }}></div>
              <div className="pathway-body">
                <h3>For practitioners</h3>
                <p style={{ fontSize: ".92rem", opacity: ".8", marginBottom: "1rem" }}>You have done the work. You have earned the right to work on your terms.</p>
                <ul>
                  <li>Earn 100% of every day rate you bill</li>
                  <li>Earn when you introduce colleagues and clients</li>
                  <li>See a client's rating before you commit</li>
                  <li>A community that works for you, not the platform</li>
                </ul>
                <Link href="/practitioners" className="btn btn-teal" data-testid="link-practitioners-more">Find out more</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pullquote-section">
        <div className="container-n">
          <div className="pullquote-block">
            <span className="pullquote-mark">&ldquo;</span>
            <p className="pullquote-text">Many of us share a desire to simply solve problems without the need for huge fanfare or long-term commitments.</p>
            <p className="pullquote-attr">Pat Butler &middot; Founding cohort member</p>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--paper)" }}>
        <div className="container-w">
          <span className="label reveal">Why TWG is different</span>
          <h2 className="reveal">Six things no other<br />network offers.</h2>
          <div className="six-grid">
            <div className="six-item reveal"><span className="num">01</span><h3>Clients are rated too</h3><p>Nobody else does this. A practitioner sees a client's 360 score before accepting an engagement.</p></div>
            <div className="six-item reveal"><span className="num">02</span><h3>Every engagement starts with agreed KPIs</h3><p>Not optional guidance. A signed Statement of Work is required before any engagement begins.</p></div>
            <div className="six-item reveal"><span className="num">03</span><h3>Fee published. Not hidden in an invoice.</h3><p>10%. Charged to the client on top of the practitioner's rate — not deducted from their earnings. Traditional firms charge 20–35% and never disclose it.</p></div>
            <div className="six-item reveal"><span className="num">04</span><h3>Practitioners keep their full rate</h3><p>The network fee is added on top for the client. The practitioner receives every pound of their day rate. Plus a 5% override when they introduce a colleague or a client.</p></div>
            <div className="six-item reveal"><span className="num">05</span><h3>Collaborative by design</h3><p>Peer introduction economics mean helping a colleague find work earns income. Collaboration is profitable, not just principled.</p></div>
            <div className="six-item reveal"><span className="num">06</span><h3>Verified entry, portable 360 reputation</h3><p>Quality gate on entry makes the 360 score meaningful. Your track record travels with you.</p></div>
          </div>
        </div>
      </section>

      <section className="stats-row tight">
        <div className="container-w">
          <div className="stats-grid">
            <div className="stat-block reveal"><span className="stat-num">£5.7bn</span><div className="stat-label">Global fractional executive market</div></div>
            <div className="stat-block reveal"><span className="stat-num">74%</span><div className="stat-label">Of fractional engagements come from referrals</div></div>
            <div className="stat-block reveal"><span className="stat-num">68%</span><div className="stat-label">Growth in demand for fractional executives 2023–24</div></div>
            <div className="stat-block reveal"><span className="stat-num">10%</span><div className="stat-label">What we charge. Most firms charge 20–35% and won't tell you.</div></div>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--paper)", padding: "4rem 0" }}>
        <div className="container">
          <span className="label reveal">The foundation</span>
          <h2 className="reveal" style={{ color: "var(--navy)", marginBottom: "0.5rem" }}>Five principles of character.</h2>
          <p className="reveal" style={{ color: "var(--muted)", maxWidth: "520px", marginBottom: "2.5rem" }}>Every decision — on governance, economics, matching, and membership — is tested against these. Not policies on a wall. How it actually works.</p>
          <div className="five-principles-row">
            {[
              { n: "01", name: "Collaboration", line: "Helping someone else succeed earns you income." },
              { n: "02", name: "Approachability", line: "The network team is reachable as people, not a brand voice." },
              { n: "03", name: "Mutual benefit", line: "Practitioner. Client. Network. Three winners — or no deal." },
              { n: "04", name: "Transparency", line: "Fees published. Ratings visible. Process explained." },
              { n: "05", name: "Openness", line: "We are building this with the people in it, not for them." },
            ].map(pr => (
              <div key={pr.n} className="five-pr-item reveal">
                <div className="five-pr-n" style={{ color: "var(--amber)" }}>{pr.n}</div>
                <div className="five-pr-name">{pr.name}</div>
                <div className="five-pr-line">{pr.line}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "2.5rem" }}>
            <Link href="/network" className="btn btn-outline-amber" data-testid="link-network-principles">Read the full principles</Link>
          </div>
        </div>
      </section>

      <section className="home-cta tight">
        <div className="container">
          <h2 className="reveal">Ready to be part<br />of something different?</h2>
          <p className="sub reveal">Whether you are a practitioner who has earned the right to better terms, or a company that wants outcomes not just resources — this is where you start.</p>
          <div className="hero-btns" style={{ justifyContent: "center" }}>
            <Link href="/clients" className="btn btn-amber" data-testid="link-cta-org">My organisation has a problem</Link>
            <Link href="/apply" className="btn btn-outline-white" data-testid="link-cta-apply">Apply as a practitioner</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
