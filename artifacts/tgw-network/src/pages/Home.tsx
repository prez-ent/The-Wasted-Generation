import { Link } from "wouter";
import { useReveal } from "@/hooks/useReveal";

export default function Home() {
  useReveal();
  return (
    <div id="page-home">
      <div className="home-hero">
        <div className="container">
          <div className="hero-eyebrow">The Wasted Generation</div>
          <h1>A governed network of proven practitioners, deployed against <em>defined outcomes.</em></h1>
          <p className="sub">When a business needs senior capability, the market forces a choice: commit to a permanent hire, pay the premium of a consultancy, or take a gamble on an unverified interim. TGW Network exists to provide a fourth option.</p>
          <div className="hero-btns">
            <Link href="/clients" className="btn btn-amber">For organisations</Link>
            <Link href="/practitioners" className="btn btn-outline-white">For practitioners</Link>
          </div>
        </div>
      </div>
      <section>
        <div className="container">
          <span className="label reveal">The Proposition</span>
          <h2 className="reveal">The experience you need.<br />Without the structural debt.</h2>
          <div className="what-grid">
            <div className="what-col reveal">
              <h3>For Organisations</h3>
              <p>Direct access to operators who have solved your problem before. No discovery phases. No junior teams. Just the exact capability you need, deployed cleanly for exactly as long as you need it.</p>
            </div>
            <div className="what-col reveal">
              <h3>For Practitioners</h3>
              <p>A structure that protects your terms and rewards your network. Full day rate retained. Paid overrides on introductions. A mutual 360 review system that makes your track record visible and bankable.</p>
            </div>
            <div className="what-col reveal">
              <h3>The Network</h3>
              <p>Not a job board. Not an agency. A governed ecosystem where every member is referenced, every engagement is evaluated, and the economics are completely transparent.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="pathways">
        <div className="container">
          <span className="label reveal">The Architecture</span>
          <h2 className="reveal">How it actually works.</h2>
          <div className="pathway-grid">
            <div className="pathway-card reveal">
              <div className="pathway-body">
                <h3>The Practitioner Standard</h3>
                <ul>
                  <li>Minimum 8 years senior functional experience</li>
                  <li>Referenced specifically against outcomes, not tenure</li>
                  <li>Committed to the network's code of conduct</li>
                  <li>Evaluated by clients post-engagement</li>
                </ul>
                <Link href="/network" className="btn btn-outline-navy" style={{ width: "100%", textAlign: "center", marginTop: "1rem" }}>View the network standard</Link>
              </div>
            </div>
            <div className="pathway-card reveal">
              <div className="pathway-body">
                <h3>The Client Standard</h3>
                <ul>
                  <li>Clear, documented problem statement</li>
                  <li>Agreed deliverables before engagement begins</li>
                  <li>Direct access to the practitioner — no intermediaries</li>
                  <li>Evaluated by practitioners post-engagement</li>
                </ul>
                <Link href="/clients" className="btn btn-outline-navy" style={{ width: "100%", textAlign: "center", marginTop: "1rem" }}>See how clients engage</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="home-cta">
        <div className="container-n">
          <span className="label reveal" style={{ color: "rgba(255,255,255,.5)" }}>Join the network</span>
          <h2 className="reveal">The founding cohort is forming.</h2>
          <p className="sub reveal">We are actively onboarding our first practitioners and engaging with organisations looking for an alternative to the traditional consultancy model.</p>
          <div className="hero-btns reveal" style={{ justifyContent: "center" }}>
            <Link href="/apply" className="btn btn-amber">Apply as a practitioner</Link>
            <Link href="/register" className="btn btn-outline-white">Register a company</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
