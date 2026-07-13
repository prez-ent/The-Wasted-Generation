import { renderToString } from "react-dom/server";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "./components/Layout";

import Home from "./pages/Home";
import Practitioners from "./pages/Practitioners";
import Clients from "./pages/Clients";
import Network from "./pages/Network";
import Pricing from "./pages/Pricing";
import Manifesto from "./pages/Manifesto";
import About from "./pages/About";
import Apply from "./pages/Apply";
import Register from "./pages/Register";

function createStaticHook(path: string) {
  const tuple: [string, (p: string) => void] = [path, () => {}];
  return () => tuple;
}

export function render(path: string): { html: string; helmetContext: Record<string, unknown> } {
  const helmetContext: Record<string, unknown> = {};
  const hook = createStaticHook(path);
  const queryClient = new QueryClient();
  const base = (import.meta.env.BASE_URL ?? "/").replace(/\/$/, "");

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={base} hook={hook}>
            <Layout>
              <Switch>
                <Route path="/" component={Home} />
                <Route path="/practitioners" component={Practitioners} />
                <Route path="/clients" component={Clients} />
                <Route path="/network" component={Network} />
                <Route path="/pricing" component={Pricing} />
                <Route path="/manifesto" component={Manifesto} />
                <Route path="/about" component={About} />
                <Route path="/apply" component={Apply} />
                <Route path="/register" component={Register} />
              </Switch>
            </Layout>
          </WouterRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );

  return { html, helmetContext };
}
