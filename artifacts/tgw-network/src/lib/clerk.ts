import { publishableKeyFromHost } from "@clerk/react/internal";

// REQUIRED — copy verbatim. Resolves the key from window.location.hostname so the
// same build serves multiple Clerk custom domains.
export const clerkPubKey = publishableKeyFromHost(
  window.location.hostname,
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
);

// REQUIRED — copy verbatim. Empty in dev (Clerk hits dev FAPI directly), auto-set
// in prod. Do NOT gate on import.meta.env.PROD / NODE_ENV.
export const clerkProxyUrl = import.meta.env.VITE_CLERK_PROXY_URL;

export const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

// Clerk passes full paths to routerPush/routerReplace, but wouter's
// setLocation prepends the base — strip it to avoid doubling.
export function stripBase(path: string): string {
  return basePath && path.startsWith(basePath)
    ? path.slice(basePath.length) || "/"
    : path;
}

export const clerkAppearance = {
  cssLayerName: "clerk",
  options: {
    logoPlacement: "inside" as const,
    logoLinkUrl: basePath || "/",
    logoImageUrl: `${window.location.origin}${basePath}/logo.svg`,
    socialButtonsPlacement: "bottom" as const,
  },
  variables: {
    colorPrimary: "#B87028",
    colorForeground: "#2C2C2C",
    colorMutedForeground: "#666666",
    colorDanger: "#B3392B",
    colorBackground: "#FFFFFF",
    colorInput: "#FFFFFF",
    colorInputForeground: "#2C2C2C",
    colorNeutral: "#1E2D40",
    fontFamily: "'DM Sans', system-ui, sans-serif",
    borderRadius: "2px",
  },
  elements: {
    rootBox: { width: "100%", display: "flex", justifyContent: "center" },
    cardBox: {
      backgroundColor: "#FFFFFF",
      width: "440px",
      maxWidth: "100%",
      overflow: "hidden",
      borderRadius: "2px",
      boxShadow: "0 2px 24px rgba(30,45,64,.12)",
      border: "1px solid rgba(30,45,64,0.12)",
    },
    card: { boxShadow: "none", border: "0", backgroundColor: "transparent", borderRadius: "0" },
    footer: { boxShadow: "none", border: "0", backgroundColor: "transparent", borderRadius: "0" },
    headerTitle: {
      fontFamily: "'Fraunces', Georgia, serif",
      fontWeight: 400,
      color: "#1E2D40",
      fontSize: "1.5rem",
    },
    headerSubtitle: { color: "#666666" },
    socialButtonsBlockButtonText: { color: "#2C2C2C" },
    formFieldLabel: {
      color: "#1E2D40",
      fontSize: ".75rem",
      letterSpacing: ".08em",
      textTransform: "uppercase" as const,
    },
    footerActionLink: { color: "#B87028", fontWeight: 500 },
    footerActionText: { color: "#666666" },
    dividerText: { color: "#666666" },
    identityPreviewEditButton: { color: "#B87028" },
    formFieldSuccessText: { color: "#085041" },
    alertText: { color: "#2C2C2C" },
    logoBox: { justifyContent: "flex-start", height: "3rem" },
    logoImage: { height: "2.75rem", width: "auto" },
    socialButtonsBlockButton: { border: "1px solid rgba(30,45,64,0.25)", borderRadius: "2px" },
    formButtonPrimary: {
      backgroundColor: "#B87028",
      color: "#FFFFFF",
      borderRadius: "2px",
      fontSize: ".82rem",
      letterSpacing: ".06em",
      fontWeight: 500,
      textTransform: "none" as const,
    },
    formFieldInput: {
      border: "1px solid rgba(30,45,64,0.3)",
      borderRadius: "2px",
      backgroundColor: "#FFFFFF",
      color: "#2C2C2C",
    },
    footerAction: { backgroundColor: "transparent" },
    dividerLine: { backgroundColor: "rgba(30,45,64,0.12)" },
    alert: { border: "1px solid rgba(30,45,64,0.12)", borderRadius: "2px" },
    otpCodeFieldInput: { border: "1px solid rgba(30,45,64,0.3)", color: "#2C2C2C" },
    formFieldRow: { gap: ".5rem" },
    main: { gap: "1.5rem" },
  },
};
