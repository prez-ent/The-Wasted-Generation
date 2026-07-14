import { useEffect, useRef } from "react";
import { Switch, Route, Redirect, useLocation, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { ClerkProvider, Show, useClerk } from "@clerk/react";
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
import MembershipApplication from "./pages/MembershipApplication";
import RegisterIntroduction from "./pages/RegisterIntroduction";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Team from "./pages/Team";

const queryClient = new QueryClient();

if (!clerkPubKey) {
  throw new Error("Missing VITE_CLERK_PUBLISHABLE_KEY");
}

function HomeRedirect() {
  return (
    <>
      <Show when="signed-in">
        <Redirect to="/dashboard" />
      </Show>
      <Home />
    </>
  );
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
        <Route path="/" component={HomeRedirect} />
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
        {/* REQUIRED — the /*? optional wildcard matches both the bare URL and
            Clerk's OAuth sub-paths (/sign-in/sso-callback, /sign-in/factor-one). */}
        <Route path="/sign-in/*?" component={SignInPage} />
        <Route path="/sign-up/*?" component={SignUpPage} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/team" component={Team} />
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
