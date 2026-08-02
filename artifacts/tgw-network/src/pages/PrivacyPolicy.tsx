import { Link } from "wouter";
import { PageMeta } from "@/components/PageMeta";

export default function PrivacyPolicy() {
  return (
    <div id="page-privacy">
      <PageMeta
        title="Privacy Policy | TWG Network"
        description="How The Wasted Generation (TWG Network) collects, uses, and protects personal data, including your rights under UK/EU GDPR and the California Consumer Privacy Act (CCPA)."
      />
      <div className="legal-hero">
        <div className="container-n">
          <span className="label">Legal</span>
          <h1>Privacy Policy</h1>
          <p className="legal-updated">Last updated: 2 August 2026</p>
        </div>
      </div>
      <section className="legal-body">
        <div className="container-n">
          <p className="legal-note">
            This policy explains how The Wasted Generation ("TWG", "TWG Network", "we") collects and
            uses personal data when you visit this website or interact with the network. It is written
            to cover the UK and EU General Data Protection Regulation (GDPR) and the California
            Consumer Privacy Act (CCPA). Final wording is subject to review by the TWG team.
          </p>

          <h2>1. Who we are</h2>
          <p>
            TWG Network is a governed professional network connecting organisations with senior
            practitioners. For any privacy question or request, contact us through the{" "}
            <Link href="/about">contact form</Link> on the About page.
          </p>

          <h2>2. What we collect</h2>
          <ul>
            <li><strong>Information you give us</strong> — name, email address, company details, and the content of any enquiry, application, or message you submit through forms on this site.</li>
            <li><strong>Account information</strong> — if you create a member account, your login email and profile details, handled by our authentication provider.</li>
            <li><strong>Technical information</strong> — IP address, browser type, and pages visited, collected through server logs and any cookies you consent to.</li>
          </ul>

          <h2>3. Why we use it (lawful bases)</h2>
          <ul>
            <li><strong>To respond to you</strong> — processing enquiries, applications, and introductions you submit (performance of a contract, or steps taken at your request before a contract).</li>
            <li><strong>To run the network</strong> — member verification, journey management, and governance (legitimate interests and contract).</li>
            <li><strong>To operate the site securely</strong> — essential cookies, fraud prevention, and logging (legitimate interests).</li>
            <li><strong>With your consent</strong> — any non-essential cookies or analytics, which you can decline or withdraw at any time.</li>
          </ul>

          <h2>4. Who we share it with</h2>
          <p>
            We do not sell personal data. We share data only with service providers who help us run the
            site — hosting, authentication, email delivery, and file storage — under contracts that
            restrict how they may use it. Where a match progresses, relevant details are shared between
            the practitioner and client organisation involved, with both parties aware.
          </p>

          <h2>5. International transfers</h2>
          <p>
            Our service providers may process data in the UK, EU, and United States. Where data leaves
            the UK or EU, we rely on appropriate safeguards such as adequacy decisions or standard
            contractual clauses.
          </p>

          <h2>6. How long we keep it</h2>
          <p>
            Enquiries and applications are retained for as long as needed to assess and respond to
            them, and afterwards only as required for legal or governance purposes. Member records are
            retained for the duration of membership plus any legally required period.
          </p>

          <h2>7. Your rights (UK &amp; EU — GDPR)</h2>
          <p>
            You have the right to access, correct, delete, or receive a copy of your personal data, to
            restrict or object to processing, and to withdraw consent at any time. You may also
            complain to your supervisory authority — in the UK, the Information Commissioner's Office
            (ICO).
          </p>

          <h2>8. Your rights (California — CCPA)</h2>
          <p>
            If you are a California resident, you have the right to know what personal information we
            collect and how it is used, to request deletion, to request correction, and to
            non-discrimination for exercising these rights. We do not sell or share personal
            information as defined by the CCPA, so no opt-out is required. To exercise any right,
            contact us through the <Link href="/about">contact form</Link>.
          </p>

          <h2>9. Cookies</h2>
          <p>
            See our <Link href="/cookie-policy">Cookie Policy</Link> for details of the cookies used on
            this site and how to manage them.
          </p>

          <h2>10. Changes to this policy</h2>
          <p>
            We will post any changes on this page and update the date at the top. Significant changes
            will be flagged more prominently.
          </p>
        </div>
      </section>
    </div>
  );
}
