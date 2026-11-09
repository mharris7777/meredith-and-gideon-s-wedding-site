import { useState, type FormEvent, type ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import RSVP from "./pages/RSVP";
import Hotel from "./pages/Hotel";
import Registry from "./pages/Registry";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();


const PASSWORD_DIGEST = "a4ca8c5d68c930c84f5a66cbc787192c9fd044c6761e8dde6bbee12bf1517990";
const SESSION_KEY = "mg-wedding-access";

function PasswordGate({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(() => {
    try {
      return sessionStorage.getItem(SESSION_KEY) === PASSWORD_DIGEST;
    } catch {
      return false;
    }
  });
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);

  async function unlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setChecking(true);
    setError("");
    try {
      const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(password));
      const hex = Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, "0")).join("");
      if (hex !== PASSWORD_DIGEST) {
        setError("That password isn’t quite right. Please try again.");
        return;
      }
      try {
        sessionStorage.setItem(SESSION_KEY, PASSWORD_DIGEST);
      } catch {
        // Visitors can still enter when browser storage is unavailable.
      }
      setPassword("");
      setUnlocked(true);
    } catch {
      setError("Unable to check the password. Please refresh and try again.");
    } finally {
      setChecking(false);
    }
  }

  if (unlocked) return <>{children}</>;

  return (
    <main className="min-h-screen min-h-[100svh] flex items-center justify-center px-6 py-16">
      <section className="w-full max-w-md text-center" aria-labelledby="welcome-title">
        <p className="overline mb-6">Meredith &amp; Gideon</p>
        <h1 id="welcome-title" className="text-4xl md:text-5xl mb-5">Welcome to our wedding</h1>
        <p className="mb-10 text-lg">Please enter the password to join us.</p>
        <form onSubmit={unlock} className="text-left">
          <label htmlFor="wedding-password" className="form-label">Password</label>
          <input
            id="wedding-password"
            name="password"
            type="password"
            autoComplete="current-password"
            autoCapitalize="none"
            spellCheck={false}
            autoFocus
            required
            value={password}
            onChange={event => { setPassword(event.target.value); setError(""); }}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "password-error" : undefined}
            className="form-input"
          />
          <p id="password-error" role="alert" className="min-h-12 pt-3 text-sm">{error}</p>
          <button type="submit" disabled={checking} className="btn-primary w-full mt-4 disabled:opacity-60">
            {checking ? "Checking…" : "Enter"}
          </button>
        </form>
      </section>
    </main>
  );
}

const App = () => (
  <PasswordGate>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <ScrollToTop />
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/rsvp" element={<RSVP />} />
    <Route path="/hotel" element={<Hotel />} />
    <Route path="/registry" element={<Registry />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
</HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </PasswordGate>
);

export default App;
