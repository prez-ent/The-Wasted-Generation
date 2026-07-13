import { useReveal } from "@/hooks/useReveal";
import { useState } from "react";
import { PageMeta } from "@/components/PageMeta";

export default function Pricing() {
  useReveal();

  const [days, setDays] = useState(40);
  const [rate, setRate] = useState(900);

  const fee = days * rate * 0.10;
  const admin = fee * 0.20;
  const total = fee + admin;

  const fmt = (n: number) => '£' + Math.round(n).toLocaleString('en-GB');

  return (
    <div id="page-pricing">
      <PageMeta
        title="Pricing | Transparent Fees — 10% Network, No Hidden Costs"
        description="Complete fee transparency: 10% network fee, 5% peer introduction override, 5% lifetime company introduction. Cap of 15%. Minimum day rate £500. No invoice surprises."
      />
      <div className="pricing-hero">
        <div className="container">
          <span className="label" style={{ color: "rgba(255,255,255,.4)" }}>Pricing</span>
          <h1><span className="hero-line">The fees. All of them.</span>{" "}<span className="hero-line">On this page.</span></h1>
          <p className="sub">No small print. No 'rates on application'. No discovery that the fee was 30% when you see the invoice.</p>
        </div>
      </div>
      
      <section className="fee-cards">
        <div className="container">
          <span className="label reveal">The three fee elements</span>
          <div className="fee-grid">
            <div className="fee-card reveal">
              <div>
                <div className="fee-pct">10<span>%</span></div>
                <div className="fee-name">Network fee</div>
              </div>
              <div>
                <h3>The network fee</h3>
                <p className="fee-who">Client pays · Additive on top of practitioner's rate · Received by TWG Network</p>
                <p style={{ fontSize: ".9rem", marginTop: ".75rem", opacity: ".75" }}>A practitioner charges £1,000 per day. The client pays £1,100. The practitioner receives £1,000 — their full rate, untouched. The network receives £100. The fee is charged to the client on top. It is never deducted from the practitioner.</p>
              </div>
              <div className="fee-example">
                <strong>Worked example</strong>
                40-day engagement at £1,000/day<br />
                Client pays: £44,000<br />
                Practitioner receives: £40,000<br />
                Network receives: £4,000
              </div>
            </div>
            
            <div className="fee-card reveal">
              <div>
                <div className="fee-pct">5<span>%</span></div>
                <div className="fee-name">Peer introduction override</div>
              </div>
              <div>
                <h3>The peer introduction override</h3>
                <p className="fee-who">Client pays · Additive to network fee · Received by the introducing practitioner</p>
                <p style={{ fontSize: ".9rem", marginTop: ".75rem", opacity: ".75" }}>Practitioner A introduces Practitioner B into a £1,000/day engagement. Practitioner B receives their full £1,000/day rate. Practitioner A receives £50 per day for the life of the engagement. The client pays £1,150/day total.</p>
              </div>
              <div className="fee-example">
                <strong>Worked example</strong>
                40-day engagement at £1,000/day<br />
                Introduced practitioner receives: £40,000<br />
                Introducing practitioner earns: £2,000<br />
                Client pays: £46,000 total
              </div>
            </div>
            
            <div className="fee-card reveal">
              <div>
                <div className="fee-pct">5<span>%</span></div>
                <div className="fee-name">Company introduction (lifetime)</div>
              </div>
              <div>
                <h3>The company introduction override</h3>
                <p className="fee-who">Client pays · Additive · Lifetime · Received by introducing practitioner</p>
                <p style={{ fontSize: ".9rem", marginTop: ".75rem", opacity: ".75" }}>Every day billed to an introduced company — by any practitioner, across all contracts — earns the introducing practitioner 5% of that day rate.</p>
              </div>
              <div className="fee-example">
                <strong>Worked example</strong>
                Company bills 200 days at £1,000/day in year 1<br />
                Introducing practitioner earns: £10,000<br />
                Ongoing for all future contracts
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="cap-floor">
        <div className="container">
          <span className="label reveal">The cap and the floor</span>
          <div className="cap-grid">
            <div className="cap-box reveal">
              <span className="cap-num">15%</span>
              <h3>Maximum total client fee above day rate</h3>
              <p>Where both a peer introduction and a company introduction apply to the same engagement, overrides are split so the total never exceeds 15%. This is a hard cap with no exceptions.</p>
            </div>
            <div className="cap-box reveal">
              <span className="cap-num">£500</span>
              <h3>Minimum day rate</h3>
              <p>The network minimum is £500 per day. Below this threshold, the 10% fee does not generate enough to fund the governance infrastructure that gives the network its value.</p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--offwhite)" }}>
        <div className="container">
          <span className="label reveal">Non-circumvention</span>
          <h2 className="reveal">What the NCA means<br />in practice.</h2>
          <p className="reveal" style={{ maxWidth: "560px", opacity: ".75" }}>The membership agreement includes a 24-month non-circumvention clause with pre-agreed liquidated damages. The calculator below is illustrative only.</p>
          <div style={{ marginTop: "1rem" }}>
            <div className="ld-disclaimer"><strong>Important:</strong> This calculator is for illustration only. It shows how the pre-agreed liquidated damages formula works. Actual damages in any specific case are determined by the terms of the signed membership agreement and are subject to legal process. This tool does not constitute legal advice.</div>
            <div className="ld-grid">
              <div>
                <div className="w-slider-label">Days worked outside the network <strong>{days}</strong></div>
                <input type="range" min="5" max="150" step="5" value={days} onChange={e => setDays(+e.target.value)} />
                <div className="w-slider-label">Day rate of the practitioner <strong>£{rate}</strong></div>
                <input type="range" min="500" max="2000" step="50" value={rate} onChange={e => setRate(+e.target.value)} />
              </div>
              <div className="ld-result">
                <div className="ld-total">{fmt(total)}</div>
                <div className="ld-total-lbl">Illustrative liquidated damages</div>
                <div className="ld-row"><span className="ld-lbl">Days outside network</span><span className="ld-val">{days}</span></div>
                <div className="ld-row"><span className="ld-lbl">Day rate</span><span className="ld-val">£{rate}</span></div>
                <div className="ld-row"><span className="ld-lbl">Lost network fee (10%)</span><span className="ld-val" style={{ color: "var(--amber)" }}>{fmt(fee)}</span></div>
                <div className="ld-row"><span className="ld-lbl">Administration premium (20%)</span><span className="ld-val" style={{ color: "var(--amber)" }}>{fmt(admin)}</span></div>
                <div className="ld-formula"><strong>The formula:</strong> Days × Day rate × 10% = lost fee. Lost fee × 20% = administration premium. Pre-agreed in the membership agreement — no need to prove actual loss in court.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: 0 }}>
        <div style={{ background: "#FFF8F0", border: "1px solid rgba(184,112,40,.3)" }}>
          <div className="cma-inner">
            <span className="cma-flag">CMA Compliance Notice</span>
            <h3>Rate discussion prohibition</h3>
            <p>Following the Competition and Markets Authority's guidance on labour market competition law, TWG Network explicitly prohibits any discussion of day rates between members.</p>
            <p style={{ marginTop: ".75rem" }}>Individual practitioners publishing their own rates on their profiles is permitted — that is transparency, not coordination. Any discussion of rates between members in any network channel, at any network event, or through any network communication is prohibited and is grounds for immediate removal from the network.</p>
            <p style={{ marginTop: ".75rem" }}>This rule is in the membership agreement. It is stated here for the same reason everything else is: because transparency is not selective.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
