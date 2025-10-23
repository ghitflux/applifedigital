import { useState } from "react";
import { MobileNav } from "@/components/layout/MobileNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageTransition } from "@/components/animations/PageTransition";
import { motion } from "framer-motion";

export default function NovaSimulacao() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tipo, setTipo] = useState("");
  const [valor, setValor] = useState("");
  const [prazo, setPrazo] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!tipo || !valor || !prazo) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Simulação enviada!",
      description: "Em breve você receberá o resultado",
    });
    
    navigate("/historico");
  };

  return (
    <PageTransition variant="slide">
      <div className="min-h-screen bg-background pb-20">
        {/* Header */}
        <motion.header
          className="px-6 pt-8 pb-6 border-b border-border"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="hover:bg-primary/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Nova Simulação</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Preencha os dados abaixo
            </p>
          </div>
        </div>
      </motion.header>

      {/* Content */}
      <main className="px-6 pt-6">
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {/* Tipo de Simulação */}
          <div className="space-y-2">
            <Label htmlFor="tipo">Tipo de Simulação</Label>
            <Select value={tipo} onValueChange={setTipo}>
              <SelectTrigger id="tipo">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="refinanciamento">Refinanciamento</SelectItem>
                <SelectItem value="novo">Novo Empréstimo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Valor Desejado */}
          <div className="space-y-2">
            <Label htmlFor="valor">Valor Desejado</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="valor"
                type="text"
                placeholder="0,00"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Prazo */}
          <div className="space-y-2">
            <Label htmlFor="prazo">Prazo (meses)</Label>
            <Select value={prazo} onValueChange={setPrazo}>
              <SelectTrigger id="prazo">
                <SelectValue placeholder="Selecione o prazo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="12">12 meses</SelectItem>
                <SelectItem value="24">24 meses</SelectItem>
                <SelectItem value="36">36 meses</SelectItem>
                <SelectItem value="48">48 meses</SelectItem>
                <SelectItem value="60">60 meses</SelectItem>
                <SelectItem value="72">72 meses</SelectItem>
                <SelectItem value="84">84 meses</SelectItem>
                <SelectItem value="96">96 meses</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Info Card */}
          <div className="card-gradient rounded-xl p-4 border border-border/50">
            <h3 className="font-semibold mb-2 text-sm">Informações Importantes</h3>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• A análise leva em média 2 horas úteis</li>
              <li>• Você será notificado quando o resultado estiver disponível</li>
              <li>• A simulação não afeta seu score de crédito</li>
            </ul>
          </div>

          {/* Submit Button */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="submit"
              className="w-full h-12 bg-gradient-primary hover:opacity-90"
            >
              Solicitar Simulação
            </Button>
          </motion.div>
        </motion.form>
      </main>

      <MobileNav />
    </div>
    </PageTransition>
  );
}
