import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import type { Plugin } from "vite";

const rawPort = process.env.PORT;

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH;

if (!basePath) {
  throw new Error(
    "BASE_PATH environment variable is required but was not provided.",
  );
}

interface RouteMeta {
  title: string;
  description: string;
}

const ROUTE_META: Record<string, RouteMeta> = {
  "/": {
    title: "The Wasted Generation (TWG Network) | Fractional Consultants & Interim Experts",
    description: "TWG Network connects businesses with senior fractional consultants and interim experts who have already solved the problem you're facing. 10% transparent fee, no markups.",
  },
  "/practitioners": {
    title: "For Practitioners | Join The Wasted Generation Network | TWG Network",
    description: "Keep 100% of your day rate. Join TWG Network as a senior fractional consultant or interim expert. 8+ years experience required. Earn peer introduction overrides.",
  },
  "/clients": {
    title: "For Organisations | Hire Fractional Experts via TWG Network",
    description: "Buy the end of a problem, not a consultant. TWG Network matches organisations with senior interim and fractional experts across four engagement formats. 10% transparent fee.",
  },
  "/network": {
    title: "The Network | Governance & 360 Evaluation Framework | TWG Network",
    description: "TWG Network is governed by five principles of character and a bilateral 360 evaluation framework that holds both practitioners and organisations accountable.",
  },
  "/pricing": {
    title: "Pricing | Transparent Fees — 10% Network, No Hidden Costs | TWG Network",
    description: "Complete fee transparency: 10% network fee, 5% peer introduction override, 5% lifetime company introduction. Cap of 15%. Minimum day rate £500. No invoice surprises.",
  },
  "/manifesto": {
    title: "Manifesto | Why Businesses Are Wasting Their Most Valuable Asset",
    description: "The Wasted Generation manifesto: age discrimination is costing the economy trillions. Senior experience is not a liability — it's the correction businesses need.",
  },
  "/about": {
    title: "About | The Wasted Generation — Founded by Andrew Engledow | TWG Network",
    description: "TWG Network was founded by Andrew Engledow after a 30-year career revealed a structural market failure: businesses systematically undervalue senior expertise.",
  },
  "/apply": {
    title: "Apply to Join | Senior Practitioners — TWG Network",
    description: "Apply to join TWG Network as a senior practitioner. Tell us your specialism, experience, and the specific problems you solve. We respond to every application.",
  },
  "/register": {
    title: "Submit a Brief | Find the Right Expert — TWG Network",
    description: "Start with the problem, not the person spec. Submit your brief to TWG Network and we'll match you with a senior expert who has already solved it. Response within one working day.",
  },
};

function resolveRoute(rawUrl: string, base: string): string {
  const withoutBase = rawUrl.startsWith(base)
    ? rawUrl.slice(base.length - 1)
    : rawUrl;
  const withoutQuery = withoutBase.split("?")[0].split("#")[0];
  const normalized = withoutQuery.replace(/\/$/, "") || "/";
  return normalized;
}

function injectMeta(html: string, meta: RouteMeta): string {
  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${meta.title}</title>`)
    .replace(
      /(<meta\s+name="description"\s+content=")[^"]*"/,
      `$1${meta.description}"`,
    )
    .replace(
      /(<meta\s+property="og:title"\s+content=")[^"]*"/,
      `$1${meta.title}"`,
    )
    .replace(
      /(<meta\s+property="og:description"\s+content=")[^"]*"/,
      `$1${meta.description}"`,
    )
    .replace(
      /(<meta\s+name="twitter:title"\s+content=")[^"]*"/,
      `$1${meta.title}"`,
    )
    .replace(
      /(<meta\s+name="twitter:description"\s+content=")[^"]*"/,
      `$1${meta.description}"`,
    );
}

function perRouteMetaPlugin(base: string): Plugin {
  return {
    name: "per-route-meta",
    transformIndexHtml: {
      order: "post",
      handler(html, ctx) {
        const rawUrl = ctx?.originalUrl ?? "/";
        const route = resolveRoute(rawUrl, base);
        const meta = ROUTE_META[route] ?? ROUTE_META["/"];
        return injectMeta(html, meta);
      },
    },
    closeBundle() {
      const outDir = path.resolve(import.meta.dirname, "dist/public");
      const indexPath = path.join(outDir, "index.html");
      let baseHtml: string;
      try {
        baseHtml = readFileSync(indexPath, "utf-8");
      } catch {
        return;
      }
      for (const [route, meta] of Object.entries(ROUTE_META)) {
        if (route === "/") continue;
        const routeHtml = injectMeta(baseHtml, meta);
        const dir = path.join(outDir, route);
        mkdirSync(dir, { recursive: true });
        writeFileSync(path.join(dir, "index.html"), routeHtml);
      }
    },
  };
}

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    runtimeErrorOverlay(),
    perRouteMetaPlugin(basePath),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, ".."),
            }),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
