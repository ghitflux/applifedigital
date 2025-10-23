import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";
import Historico from "./pages/Historico";
import Notificacoes from "./pages/Notificacoes";
import Perfil from "./pages/Perfil";
import DetalhesMargem from "./pages/DetalhesMargem";
import DetalhesSimulacao from "./pages/DetalhesSimulacao";
import Auth from "./pages/Auth";
import NovaSimulacao from "./pages/NovaSimulacao";
import EnviarDocumento from "./pages/EnviarDocumento";
import DadosPessoais from "./pages/DadosPessoais";
import MeusDocumentos from "./pages/MeusDocumentos";
import SegurancaPrivacidade from "./pages/SegurancaPrivacidade";
import AjudaSuporte from "./pages/AjudaSuporte";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Welcome />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/historico" element={<Historico />} />
        <Route path="/notificacoes" element={<Notificacoes />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/margem" element={<DetalhesMargem />} />
        <Route path="/simulacao/:id" element={<DetalhesSimulacao />} />
        <Route path="/nova-simulacao" element={<NovaSimulacao />} />
        <Route path="/enviar-documento" element={<EnviarDocumento />} />
        <Route path="/dados-pessoais" element={<DadosPessoais />} />
        <Route path="/meus-documentos" element={<MeusDocumentos />} />
        <Route path="/seguranca-privacidade" element={<SegurancaPrivacidade />} />
        <Route path="/ajuda-suporte" element={<AjudaSuporte />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
