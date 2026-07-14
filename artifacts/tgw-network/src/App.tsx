import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
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
import MembershipApplication from "./pages/MembershipApplication";
import RegisterIntroduction from "./pages/RegisterIntroduction";

const queryClient = new QueryClient();

function Router() {
  return (
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
        <Route path="/membership-application-k7x2v9q4mt" component={MembershipApplication} />
        <Route path="/register-introduction-w8n3j6r2pf" component={RegisterIntroduction} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  useSmoothScroll();
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
