import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import RSVP from "./pages/RSVP";
import Hotel from "./pages/Hotel";
import Registry from "./pages/Registry";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
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
);

export default App;
