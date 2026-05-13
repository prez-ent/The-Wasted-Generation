import { Link, useLocation } from "wouter";
import { Logo } from "./Logo";
import { useState, useEffect } from "react";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Close mobile nav when location changes
  useEffect(() => {
    setMobileNavOpen(false);
  }, [location]);

  return (
    <>
      <nav>
        <Link href="/" className="nav-logo" data-testid="link-home">
          <Logo />
        </Link>
        <ul className="nav-links" style={{ display: mobileNavOpen ? "flex" : "" }}>
          <li><Link href="/practitioners" className={location === "/practitioners" ? "active" : ""} data-testid="link-practitioners">For Practitioners</Link></li>
          <li><Link href="/clients" className={location === "/clients" ? "active" : ""} data-testid="link-clients">For Organisations</Link></li>
          <li><Link href="/network" className={location === "/network" ? "active" : ""} data-testid="link-network">The Network</Link></li>
          <li><Link href="/pricing" className={location === "/pricing" ? "active" : ""} data-testid="link-pricing">Pricing</Link></li>
          <li><Link href="/manifesto" className={location === "/manifesto" ? "active" : ""} data-testid="link-manifesto">Manifesto</Link></li>
          <li><Link href="/about" className={location === "/about" ? "active" : ""} data-testid="link-about">About</Link></li>
        </ul>
        <div className="nav-cta" style={{ display: mobileNavOpen ? "flex" : "" }}>
          <Link href="/apply" className="btn btn-outline-white" data-testid="link-apply">Apply</Link>
          <Link href="/register" className="btn btn-amber" data-testid="link-register">Find an expert</Link>
        </div>
        <button 
          className="nav-mobile-toggle" 
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          data-testid="button-mobile-nav"
        >
          ☰
        </button>
      </nav>
      
      <main className="page active">
        {children}
      </main>

      <footer>
        <div className="container">
          <div className="footer-inner">
            <Link href="/" className="footer-logo">
              <Logo />
            </Link>
            <div className="footer-links">
              <Link href="/practitioners">For Practitioners</Link>
              <Link href="/clients">For Organisations</Link>
              <Link href="/network">The Network</Link>
              <Link href="/pricing">Pricing</Link>
              <Link href="/manifesto">Manifesto</Link>
              <Link href="/about">About</Link>
            </div>
            <div className="footer-tagline">
              The Wasted Generation<br />A governed professional network.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
