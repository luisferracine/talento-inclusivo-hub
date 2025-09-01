import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ColorblindModeProvider } from "@/hooks/use-colorblind-mode";
import { AccessibilityProvider } from "@/hooks/use-accessibility";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Vagas from "./pages/Vagas";
import DashboardEmpresa from "./pages/DashboardEmpresa";
import DashboardPcd from "./pages/DashboardPcd";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ColorblindModeProvider>
        <AccessibilityProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/vagas" element={<Vagas />} />
              <Route path="/dashboard-empresa" element={<DashboardEmpresa />} />
              <Route path="/dashboard-pcd" element={<DashboardPcd />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AccessibilityProvider>
      </ColorblindModeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
