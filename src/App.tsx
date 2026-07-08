import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Acesso from "./pages/Acesso";
import Teste from "./pages/Teste";
import Resultado from "./pages/Resultado";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminTokens from "./pages/admin/AdminTokens";
import AdminLeads from "./pages/admin/AdminLeads";
import AdminResultados from "./pages/admin/AdminResultados";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/acesso" element={<Acesso />} />
          <Route path="/teste" element={<Teste />} />
          <Route path="/resultado" element={<Resultado />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/tokens" element={<AdminTokens />} />
          <Route path="/admin/leads" element={<AdminLeads />} />
          <Route path="/admin/resultados" element={<AdminResultados />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
