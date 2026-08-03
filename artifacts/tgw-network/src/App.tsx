import { useEffect, useRef } from "react";
import { Switch, Route, useLocation, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { ClerkProvider, useClerk } from "@clerk/react";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Layout } from "./components/Layout";
import { clerkPubKey, clerkProxyUrl, basePath, stripBase, clerkAppearance } from "./lib/clerk";

import Home from "./pages/Home";
import Practitioners from "./pages/Practitioners";
import Clients from "./pages/Clients";
import Network from "./pages/Network";
import Pricing from "./pages/Pricing";
import Manifesto from "./pages/Manifesto";
import About from "./pages/About";
import Apply from "./pages/Apply";
import Register from "./pages/Register";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookiePolicy from "./pages/CookiePolicy";

const queryClient = new QueryClient();

if (!clerkPubKey) {
  throw new Error("Missing VITE_CLERK_PUBLISHABLE_KEY");
}

// Keeps the view up-to-date when the signed-in user changes by clearing the
// QueryClient cache.
function ClerkQueryClientCacheInvalidator() {
  const { addListener } = useClerk();
  const qc = useQueryClient();
  const prevUserIdRef = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = addListener(({ user }) => {
      const userId = user?.id ?? null;
      if (prevUserIdRef.current !== undefined && prevUserIdRef.current !== userId) {
        qc.clear();
      }
      prevUserIdRef.current = userId;
    });
    return unsubscribe;
  }, [addListener, qc]);

  return null;
}

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
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/cookie-policy" component={CookiePolicy} />
        {/* Member area routes (sign-in, sign-up, dashboard, team, membership
            application, introduction registration) removed from the public
            site 2026-08-02 at the founders' request. Page components are kept
            in src/pages so the member area can be re-enabled later. */}
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function ClerkProviderWithApp() {
  const [, setLocation] = useLocation();

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      proxyUrl={clerkProxyUrl}
      appearance={clerkAppearance}
      signInUrl={`${basePath}/sign-in`}
      signUpUrl={`${basePath}/sign-up`}
      localization={{
        signIn: {
          start: {
            title: "Welcome back",
            subtitle: "Sign in to your TWG Network account",
          },
        },
        signUp: {
          start: {
            title: "Create your account",
            subtitle: "Follow your journey through the network",
          },
        },
      }}
      routerPush={(to) => setLocation(stripBase(to))}
      routerReplace={(to) => setLocation(stripBase(to), { replace: true })}
    >
      <QueryClientProvider client={queryClient}>
        <ClerkQueryClientCacheInvalidator />
        <TooltipProvider>
          <Router />
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}

function App() {
  useSmoothScroll();
  return (
    <HelmetProvider>
      <WouterRouter base={basePath}>
        <ClerkProviderWithApp />
      </WouterRouter>
    </HelmetProvider>
  );
}

export default App;
