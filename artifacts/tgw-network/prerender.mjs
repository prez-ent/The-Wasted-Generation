import { build } from "vite";
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const ROUTES = [
  "/",
  "/practitioners",
  "/clients",
  "/network",
  "/pricing",
  "/manifesto",
  "/about",
  "/apply",
  "/register",
];

const ROUTE_META = {
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

const SITE_URL = (process.env.VITE_SITE_URL ?? "https://twgnetwork.com").replace(/\/$/, "");
const BASE_PATH = process.env.BASE_PATH ?? "/";

function injectHead(html, meta, canonical) {
  let result = html
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

  result = result
    .replace(/<link\s+rel="canonical"[^>]*>/g, "")
    .replace(/<meta\s+property="og:url"[^>]*>/g, "")
    .replace(
      "</head>",
      `  <link rel="canonical" href="${canonical}" />\n  <meta property="og:url" content="${canonical}" />\n</head>`,
    );

  return result;
}

console.log(`[prerender] Building SSR bundle…`);

await build({
  root: __dirname,
  base: BASE_PATH,
  configFile: false,
  plugins: [
    (await import("@vitejs/plugin-react")).default(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    dedupe: ["react", "react-dom"],
  },
  define: {
    "import.meta.env.VITE_SITE_URL": JSON.stringify(SITE_URL),
    "import.meta.env.BASE_URL": JSON.stringify(BASE_PATH),
    "import.meta.env.MODE": JSON.stringify("production"),
    "import.meta.env.DEV": "false",
    "import.meta.env.PROD": "true",
    "import.meta.env.SSR": "true",
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  build: {
    ssr: "src/entry-server.tsx",
    outDir: "dist/server",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        format: "esm",
      },
    },
  },
  ssr: {
    noExternal: ["react-helmet-async", "wouter"],
  },
  logLevel: "warn",
});

console.log(`[prerender] SSR bundle ready. Rendering routes…`);

const { render } = await import(path.join(__dirname, "dist/server/entry-server.js"));

const outDir = path.join(__dirname, "dist/public");
const baseHtml = readFileSync(path.join(outDir, "index.html"), "utf-8");

function stripHelmetBodyTags(html) {
  return html.replace(
    /^(\s*(<title>[^<]*<\/title>|<meta(\s[^>]*)?\/>|<meta(\s[^>]*)?>|<link(\s[^>]*)?\/>|<link(\s[^>]*)?>)\s*)*/i,
    "",
  );
}

for (const route of ROUTES) {
  const { html } = render(route);
  const meta = ROUTE_META[route] ?? ROUTE_META["/"];
  const canonical = `${SITE_URL}${route === "/" ? "" : route}`;
  const bodyHtml = stripHelmetBodyTags(html);

  let routeHtml = injectHead(baseHtml, meta, canonical)
    .replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`);

  if (route === "/") {
    writeFileSync(path.join(outDir, "index.html"), routeHtml);
  } else {
    const dir = path.join(outDir, route);
    mkdirSync(dir, { recursive: true });
    writeFileSync(path.join(dir, "index.html"), routeHtml);
  }

  console.log(`[prerender] ✓ ${route}`);
}

console.log(`[prerender] Done — ${ROUTES.length} routes written to dist/public.`);
