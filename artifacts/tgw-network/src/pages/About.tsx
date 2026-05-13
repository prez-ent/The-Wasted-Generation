import { Link } from "wouter";
import { useReveal } from "@/hooks/useReveal";

export default function About() {
  useReveal();

  return (
    <div id="page-about">
      <div className="about-hero">
        <div className="container-n">
          <span className="label">About</span>
          <h1>Why this exists.</h1>
        </div>
      </div>
      <section className="about-body">
        <div className="container-n">
          <p className="reveal" style={{ fontFamily: "var(--serif)", fontSize: "1.3rem", fontWeight: "300", lineHeight: "1.6", color: "var(--navy)", marginBottom: "2rem" }}>
            TGW exists for two reasons. Because a generation of experienced professionals deserves a market that recognises what they are worth. And because the organisations ignoring that market are the ones paying the price.
          </p>
          <p className="reveal">
            This is not a platform. It is a correction. A governed network built on the belief that the most experienced operators in the market should not have to choose between their expertise and their terms — and that organisations should not have to choose between senior capability and certainty of outcome.
          </p>
          <p className="reveal">
            TGW is a journey, not a launch. The founding cohort is forming now. The first briefs are coming in. The network will learn what problems it can solve, which sectors it serves best, and where the model works hardest. That knowledge will shape everything that comes next.
          </p>
          <p className="reveal">
            Right now, the two things that will not change are the people TGW is for — the practitioners the market keeps underestimating, and the organisations smart enough to know what they are missing — and the principle that both sides deserve better terms than the market has offered them.
          </p>
          <p className="reveal">
            Three problems have existed in the fractional and interim market for a long time. Organisations have no reliable way to assess practitioner quality before committing. Practitioners have no protection from the practices that damage their work. And the market has no accountability mechanism that applies to both parties.
          </p>
          <p className="reveal">
            TGW addresses all three. Not with another directory. Not with better matching technology. With the infrastructure that makes expert deployment work properly — for everyone involved.
          </p>
        </div>
      </section>
      <section className="contact-section">
        <div className="container-n">
          <span className="label reveal">The founder</span>
          <h2 className="reveal" style={{ fontSize: "1.8rem" }}>Andrew Engledow</h2>
          <div className="reveal" style={{ maxWidth: "580px" }}>
            <p>Thirty years of senior commercial experience across regulated technology markets in EMEA, APAC, and North America. Deals closed north of £29 million. The kind of career that looks impressive on paper and that the market decided, at a certain point, to overlook.</p>
            <p>TGW was built from that experience — and from the recognition that the problem was not personal. It was structural. A generation of professionals like Andrew were being filtered out not because their capability had diminished but because the systems doing the filtering were not designed to see it.</p>
            <p>The network exists to correct that. Andrew can be reached directly at the address below.</p>
          </div>
        </div>
      </section>
      <section className="contact-section">
        <div className="container-n">
          <span className="label reveal">Contact</span>
          <h2 className="reveal" style={{ fontSize: "1.8rem" }}>Get in touch.</h2>
          <div className="reveal">
            <p>The network team is available by email and — where helpful — by call. We do not have a ticketing system.</p>
            <a className="contact-email" href="mailto:andrew@engledow.co.uk">andrew@engledow.co.uk</a>
            <p style={{ fontSize: ".88rem", opacity: ".65" }}>We aim to respond within one working day. If something is urgent, say so in the subject line.</p>
            <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/apply" className="btn btn-amber">Apply as a practitioner</Link>
              <Link href="/register" className="btn btn-outline-navy">Register a company</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
