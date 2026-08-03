import { Link, useLocation } from "wouter";
import { Logo } from "./Logo";
import { CookieConsent } from "./CookieConsent";
import { useState, useEffect } from "react";
import { scrollToTop } from "../hooks/useSmoothScroll";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const close = () => setMobileNavOpen(false);

  const handleNavClick = (href: string) => {
    if (location === href) scrollToTop(false);
  };

  useEffect(() => {
    setMobileNavOpen(false);
  }, [location]);

  useEffect(() => {
    scrollToTop(true);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileNavOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileNavOpen]);

  const navLinks = [
    { href: "/clients",       label: "For Organisations", testId: "link-clients" },
    { href: "/practitioners", label: "For Practitioners", testId: "link-practitioners" },
    { href: "/network",       label: "The Network",       testId: "link-network" },
    { href: "/pricing",       label: "Pricing",           testId: "link-pricing" },
    { href: "/manifesto",     label: "Manifesto",         testId: "link-manifesto" },
    { href: "/about",         label: "About",             testId: "link-about" },
  ];

  return (
    <>
      <nav>
        <Link href="/" className="nav-logo" data-testid="link-home" onClick={() => handleNavClick("/")}>
          <Logo />
        </Link>

        {/* Desktop links — hidden below 1024px by CSS */}
        <ul className="nav-links">
          {navLinks.map(l => (
            <li key={l.href}>
              <Link href={l.href} className={location === l.href ? "active" : ""} data-testid={l.testId} onClick={() => handleNavClick(l.href)}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA — hidden below 1024px by CSS */}
        <div className="nav-cta">
          <Link href="/apply"    className="btn btn-outline-white" data-testid="link-apply">Apply</Link>
          <Link href="/register" className="btn btn-amber"         data-testid="link-register">Find an expert</Link>
        </div>

        {/* Hamburger toggle — shown below 1024px by CSS */}
        <button
          className="nav-mobile-toggle"
          onClick={() => setMobileNavOpen(o => !o)}
          aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileNavOpen}
          data-testid="button-mobile-nav"
        >
          {mobileNavOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile drawer — block-level, no flex interference */}
      {mobileNavOpen && (
        <div className="mob-drawer" data-testid="mobile-drawer">
          {/* Nav links — plain block divs, no ul/li */}
          <div className="mob-drawer-links">
            {navLinks.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className={`mob-drawer-link${location === l.href ? " active" : ""}`}
                data-testid={`mob-${l.testId}`}
                onClick={() => { close(); handleNavClick(l.href); }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="mob-drawer-cta">
            <Link href="/apply"    className="btn btn-outline-white mob-btn" onClick={close} data-testid="mob-link-apply">Apply as a practitioner</Link>
            <Link href="/register" className="btn btn-amber mob-btn"         onClick={close} data-testid="mob-link-register">Find an expert</Link>
          </div>

          {/* Explicit close button */}
          <div className="mob-drawer-close-wrap">
            <button className="mob-drawer-close-btn" onClick={close} data-testid="button-close-drawer">
              <span className="mob-drawer-close-icon">✕</span>
              Close menu
            </button>
          </div>
        </div>
      )}

      <main className="page active">
        {children}
      </main>

      <footer>
        <div className="container">
          <div className="footer-inner">
            <Link href="/" className="footer-logo" onClick={() => handleNavClick("/")}>
              <Logo />
            </Link>
            <div className="footer-links">
              {navLinks.map(l => (
                <Link key={l.href} href={l.href} onClick={() => handleNavClick(l.href)}>{l.label}</Link>
              ))}
            </div>
            <div className="footer-tagline">
              The Wasted Generation<br />A governed professional network.
            </div>
          </div>
          <div className="footer-legal">
            <Link href="/privacy-policy" data-testid="link-footer-privacy">Privacy Policy</Link>
            <Link href="/cookie-policy" data-testid="link-footer-cookies">Cookie Policy</Link>
          </div>
        </div>
      </footer>
      <CookieConsent />
    </>
  );
}
