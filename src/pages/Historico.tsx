import { MobileNav } from "@/components/layout/MobileNav";
import { CheckCircle2, Clock, XCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const simulacoes = [
  {
    id: "1234",
    tipo: "Refinanciamento",
    valor: "R$ 15.000,00",
    data: "15 Out 2025",
    status: "em_analise",
  },
  {
    id: "1233",
    tipo: "Novo Empréstimo",
    valor: "R$ 8.500,00",
    data: "08 Out 2025",
    status: "aprovado",
  },
  {
    id: "1232",
    tipo: "Refinanciamento",
    valor: "R$ 12.000,00",
    data: "01 Out 2025",
    status: "rejeitado",
  },
];

const statusConfig = {
  em_analise: {
    label: "Em Análise",
    icon: Clock,
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  aprovado: {
    label: "Aprovado",
    icon: CheckCircle2,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  rejeitado: {
    label: "Rejeitado",
    icon: XCircle,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
};

export default function Historico() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="px-6 pt-8 pb-6">
        <h1 className="text-2xl font-bold">Histórico</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Acompanhe suas simulações
        </p>
      </header>

      {/* Content */}
      <main className="px-6 space-y-4">
        {simulacoes.map((simulacao) => {
          const config = statusConfig[simulacao.status as keyof typeof statusConfig];
          const StatusIcon = config.icon;

          return (
            <div
              key={simulacao.id}
              className="card-gradient rounded-2xl p-5 border border-border/50 hover:border-primary/50 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">{simulacao.tipo}</h3>
                    <span className="text-xs text-muted-foreground">
                      #{simulacao.id}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-gradient">
                    {simulacao.valor}
                  </p>
                </div>
                <div className={`p-2 rounded-lg ${config.bgColor}`}>
                  <StatusIcon className={`h-5 w-5 ${config.color}`} />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className={`text-xs font-medium ${config.color}`}>
                    {config.label}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {simulacao.data}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-primary hover:bg-primary/10"
                  onClick={() => window.location.href = `/simulacao/${simulacao.id}`}
                >
                  Ver Detalhes
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </main>

      <MobileNav />
    </div>
  );
}
