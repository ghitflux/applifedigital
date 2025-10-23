import { MobileNav } from "@/components/layout/MobileNav";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp, Clock, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DetalhesMargem() {
  const navigate = useNavigate();

  const margemHistory = [
    { date: "Out 2025", value: "R$ 4.500,00", status: "current" },
    { date: "Set 2025", value: "R$ 4.200,00", status: "past" },
    { date: "Ago 2025", value: "R$ 4.100,00", status: "past" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="px-6 pt-8 pb-6 border-b border-border">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="hover:bg-primary/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Detalhes da Margem</h1>
        </div>
      </header>

      {/* Content */}
      <main className="px-6 pt-6 space-y-6">
        {/* Margem Atual */}
        <div className="card-gradient rounded-2xl p-6 border border-primary/30">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Margem Disponível
              </p>
              <h2 className="text-4xl font-bold text-gradient">
                R$ 4.500,00
              </h2>
            </div>
            <div className="p-3 rounded-xl bg-primary/20">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between py-3 border-t border-border/50">
              <span className="text-sm text-muted-foreground">
                Margem Bruta
              </span>
              <span className="text-sm font-semibold">R$ 6.000,00</span>
            </div>
            <div className="flex items-center justify-between py-3 border-t border-border/50">
              <span className="text-sm text-muted-foreground">
                Margem Utilizada
              </span>
              <span className="text-sm font-semibold">R$ 1.500,00</span>
            </div>
            <div className="flex items-center justify-between py-3 border-t border-border/50">
              <span className="text-sm text-muted-foreground">
                % Disponível
              </span>
              <span className="text-sm font-semibold text-success">75%</span>
            </div>
          </div>
        </div>

        {/* Histórico de Margem */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Histórico de Margem</h3>
          <div className="space-y-3">
            {margemHistory.map((item, index) => (
              <div
                key={index}
                className="card-gradient rounded-xl p-4 border border-border/50 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      item.status === "current"
                        ? "bg-success/20"
                        : "bg-muted/20"
                    }`}
                  >
                    {item.status === "current" ? (
                      <CheckCircle2 className="h-5 w-5 text-success" />
                    ) : (
                      <Clock className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{item.date}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.status === "current" ? "Atual" : "Histórico"}
                    </p>
                  </div>
                </div>
                <p className="text-lg font-bold">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Informações Adicionais */}
        <div className="card-gradient rounded-2xl p-6 border border-border/50">
          <h3 className="text-lg font-semibold mb-4">Informações</h3>
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">Atualização:</strong> A
              margem é atualizada mensalmente com base no seu contracheque.
            </p>
            <p>
              <strong className="text-foreground">Validade:</strong> A margem
              disponível é válida até o próximo processamento de folha.
            </p>
            <p>
              <strong className="text-foreground">Reserva:</strong> Ao iniciar
              uma simulação, a margem é temporariamente reservada.
            </p>
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  );
}
