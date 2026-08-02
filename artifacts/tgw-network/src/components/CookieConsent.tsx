import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";

const STORAGE_KEY = "twg-cookie-consent";

export type CookieChoice = "accepted" | "declined";

export function getCookieConsent(): CookieChoice | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === "accepted" || v === "declined" ? v : null;
  } catch {
    return null;
  }
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const acceptRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (getCookieConsent() === null) setVisible(true);
  }, []);

  useEffect(() => {
    if (visible) acceptRef.current?.focus();
  }, [visible]);

  const choose = (choice: CookieChoice) => {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // storage unavailable — banner will reappear next visit
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="region" aria-label="Cookie consent" data-testid="cookie-banner">
      <div className="cookie-banner-inner">
        <div className="cookie-banner-text">
          <strong>Cookies on this site.</strong> We use essential cookies to make this site work — for
          example, to keep you signed in. With your consent we may also use non-essential cookies to
          understand how the site is used. See our{" "}
          <Link href="/cookie-policy" data-testid="link-cookie-policy-banner">Cookie Policy</Link> and{" "}
          <Link href="/privacy-policy" data-testid="link-privacy-policy-banner">Privacy Policy</Link>.
        </div>
        <div className="cookie-banner-actions">
          <button className="btn btn-outline-navy cookie-btn" onClick={() => choose("declined")} data-testid="button-cookies-decline">
            Decline non-essential
          </button>
          <button ref={acceptRef} className="btn btn-amber cookie-btn" onClick={() => choose("accepted")} data-testid="button-cookies-accept">
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
