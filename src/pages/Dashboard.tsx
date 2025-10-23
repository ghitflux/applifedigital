import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/ui/stat-card";
import { MobileNav } from "@/components/layout/MobileNav";
import {
  DollarSign,
  FileText,
  Upload,
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageTransition } from "@/components/animations/PageTransition";
import { motion } from "framer-motion";

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <PageTransition variant="fade">
      <div className="min-h-screen bg-background pb-20">
        {/* Header */}
        <motion.header
          className="px-6 pt-8 pb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-bold">Olá, João!</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Bem-vindo de volta
            </p>
          </div>
          <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold">
            J
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="px-6 space-y-6">
        {/* Margem Disponível */}
        <motion.section
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <h2 className="text-lg font-semibold">Sua Margem</h2>
          <div className="card-gradient rounded-2xl p-6 border border-border/50 glow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Margem Disponível</p>
                <h3 className="text-3xl font-bold mt-2 text-gradient">
                  R$ 5.240,00
                </h3>
              </div>
              <div className="p-3 rounded-xl bg-success/10">
                <DollarSign className="h-6 w-6 text-success" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-success" />
              <span>Atualizado há 2 horas</span>
            </div>
            <Button
              className="w-full mt-4 bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20"
              variant="outline"
              onClick={() => navigate("/margem")}
            >
              Ver Detalhes
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.section>

        {/* Quick Actions */}
        <motion.section
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <h2 className="text-lg font-semibold">Ações Rápidas</h2>
          <div className="grid grid-cols-2 gap-4">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                className="h-32 flex flex-col items-center justify-center gap-3 bg-card/50 border-border/50 hover:border-primary/50 w-full"
                onClick={() => navigate("/nova-simulacao")}
              >
                <div className="p-3 rounded-xl bg-primary/10">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <span className="text-sm font-medium">Nova Simulação</span>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                className="h-32 flex flex-col items-center justify-center gap-3 bg-card/50 border-border/50 hover:border-primary/50 w-full"
                onClick={() => navigate("/enviar-documento")}
              >
                <div className="p-3 rounded-xl bg-primary/10">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <span className="text-sm font-medium">Enviar Documento</span>
              </Button>
            </motion.div>
          </div>
        </motion.section>

        {/* Status Cards */}
        <motion.section
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <h2 className="text-lg font-semibold">Status Atual</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-card/50 border border-border/50">
              <div className="p-2 rounded-lg bg-success/10">
                <CheckCircle2 className="h-5 w-5 text-success" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm">Documentos</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Todos verificados
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-card/50 border border-border/50">
              <div className="p-2 rounded-lg bg-warning/10">
                <Clock className="h-5 w-5 text-warning" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm">Simulação #1234</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Em análise
                </p>
              </div>
              <Button size="sm" variant="ghost" className="text-primary" onClick={() => navigate("/simulacao/1234")}>
                Ver
              </Button>
            </div>
          </div>
        </motion.section>

        {/* Info Card */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="flex-1 text-sm">
                <p className="font-semibold text-primary mb-1">
                  Dica do Dia
                </p>
                <p className="text-muted-foreground text-xs">
                  Mantenha seus contracheques atualizados para garantir a melhor margem disponível.
                </p>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      <MobileNav />
    </div>
    </PageTransition>
  );
}
