import { Link } from "wouter";
import { PageMeta } from "@/components/PageMeta";

export default function CookiePolicy() {
  const reopenBanner = () => {
    try {
      localStorage.removeItem("twg-cookie-consent");
    } catch {
      // ignore
    }
    window.location.reload();
  };

  return (
    <div id="page-cookies">
      <PageMeta
        title="Cookie Policy | TWG Network"
        description="The cookies used on the TWG Network website, what they do, and how to accept, decline, or change your cookie preferences."
      />
      <div className="legal-hero">
        <div className="container-n">
          <span className="label">Legal</span>
          <h1>Cookie Policy</h1>
          <p className="legal-updated">Last updated: 2 August 2026</p>
        </div>
      </div>
      <section className="legal-body">
        <div className="container-n">
          <h2>1. What cookies are</h2>
          <p>
            Cookies are small text files placed on your device by a website. Similar technologies, such
            as local storage, are covered by this policy too. Cookies can be essential (the site does
            not work without them) or non-essential (analytics, preferences, marketing).
          </p>

          <h2>2. Cookies we use</h2>
          <table className="legal-table">
            <thead>
              <tr><th>Category</th><th>Purpose</th><th>Consent needed</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Essential — authentication</strong></td>
                <td>Keeps members signed in to the member area and secures sign-in. Set by our authentication provider only when you sign in or create an account.</td>
                <td>No — strictly necessary</td>
              </tr>
              <tr>
                <td><strong>Essential — preferences</strong></td>
                <td>Remembers your cookie consent choice so we do not ask on every visit (stored in your browser's local storage).</td>
                <td>No — strictly necessary</td>
              </tr>
              <tr>
                <td><strong>Non-essential — analytics</strong></td>
                <td>We do not currently use analytics cookies. If that changes, they will only be set with your consent and this policy will be updated first.</td>
                <td>Yes</td>
              </tr>
            </tbody>
          </table>

          <h2>3. Managing your choice</h2>
          <p>
            On your first visit a banner lets you accept or decline non-essential cookies. You can
            change your mind at any time:
          </p>
          <p>
            <button className="btn btn-outline-navy" onClick={reopenBanner} data-testid="button-reopen-cookie-banner">
              Change cookie preferences
            </button>
          </p>
          <p>
            You can also block or delete cookies through your browser settings. Blocking essential
            cookies may prevent the member area from working.
          </p>

          <h2>4. More information</h2>
          <p>
            For how we handle personal data more broadly, see our{" "}
            <Link href="/privacy-policy">Privacy Policy</Link>.
          </p>
        </div>
      </section>
    </div>
  );
}
