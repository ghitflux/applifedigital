import { MobileNav } from "@/components/layout/MobileNav";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, CheckCircle2, XCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export default function DetalhesSimulacao() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock data - em produção viria de uma API
  const simulacao = {
    id: id || "1234",
    tipo: "Refinanciamento",
    status: "aprovado",
    atribuidoA: "Patrine",
    bancosIncluidos: ["DAYCOVAL", "CAIXA"],
    prazo: "96 meses",
    consultoria: "8%",
    totaisBancos: {
      valorParcelaTotal: "R$ 1.613,31",
      saldoDevedorTotal: "R$ 45.734,90",
      valorLiberadoTotal: "R$ 37.712,31",
      seguroObrigatorioBanco: "R$ 1.500,00",
    },
    calculosFinanceiros: {
      valorTotalFinanciado: "R$ 83.447,21",
      valorLiquido: "R$ 36.212,31",
      custoConsultoria: "R$ 6.675,78",
      custoConsultoriaLiquido: "R$ 5.741,17",
      consultoriaPercentual: "86%",
    },
    liberadoCliente: "R$ 29.536,54",
    data: "15 Out 2025",
  };

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
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl font-bold">Resultado da Simulação</h1>
              {simulacao.status === "aprovado" && (
                <div className="px-2 py-0.5 rounded-md bg-success/20 border border-success/30">
                  <span className="text-xs font-medium text-success flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Calculado
                  </span>
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground">#{simulacao.id}</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="px-6 pt-6 space-y-4">
        {/* Valor Pré-Liberado - Destaque no topo */}
        <div className="rounded-2xl p-6 border-2 border-success/50 bg-success/10">
          <p className="text-sm font-medium text-success/80 mb-2">
            Valor Pré-Liberado para Você!
          </p>
          <p className="text-4xl font-bold text-success">
            {simulacao.liberadoCliente}
          </p>
        </div>

        {/* Actions - Botões no topo */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 h-12 border-destructive/30 text-destructive hover:bg-destructive/10"
          >
            <XCircle className="mr-2 h-5 w-5" />
            Reprovar
          </Button>
          <Button className="flex-1 h-12 bg-success hover:bg-success/90">
            <CheckCircle2 className="mr-2 h-5 w-5" />
            Aprovar e Enviar
          </Button>
        </div>

        {/* Bancos Incluídos */}
        <div className="card-gradient rounded-xl p-4 border border-border/50">
          <h3 className="text-base font-semibold mb-3">Bancos Incluídos</h3>
          <div className="flex gap-2 mb-3">
            {simulacao.bancosIncluidos.map((banco) => (
              <div
                key={banco}
                className="px-3 py-2 rounded-lg bg-primary/20 border border-primary/30"
              >
                <span className="text-sm font-semibold text-primary">
                  {banco}
                </span>
              </div>
            ))}
          </div>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <span>Prazo: {simulacao.prazo}</span>
            <span>% Consultoria: {simulacao.consultoria}</span>
          </div>
        </div>

        {/* Totais dos Bancos */}
        <div className="card-gradient rounded-xl p-4 border border-border/50">
          <h3 className="text-base font-semibold mb-4">
            📊 Totais dos Bancos
          </h3>
          <div className="space-y-2.5">
            {Object.entries(simulacao.totaisBancos).map(([key, value]) => (
              <div
                key={key}
                className="flex items-center justify-between py-2 border-b border-border/30 last:border-0"
              >
                <span className="text-sm text-muted-foreground">
                  {key === "valorParcelaTotal" && "Valor Parcela Total"}
                  {key === "saldoDevedorTotal" && "Saldo Devedor Total"}
                  {key === "valorLiberadoTotal" && "Valor Liberado Total"}
                  {key === "seguroObrigatorioBanco" && "Seguro Obrigatório Banco"}
                </span>
                <span className="text-base font-bold">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cálculos Financeiros */}
        <div className="card-gradient rounded-xl p-4 border border-border/50">
          <h3 className="text-base font-semibold mb-4">
            💰 Cálculos Financeiros
          </h3>
          <div className="space-y-2.5">
            {Object.entries(simulacao.calculosFinanceiros)
              .filter(([key]) => key !== "custoConsultoriaLiquido" && key !== "consultoriaPercentual")
              .map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center justify-between py-2 border-b border-border/30 last:border-0"
                >
                  <span className="text-sm text-muted-foreground">
                    {key === "valorTotalFinanciado" && "Valor Total Financiado"}
                    {key === "valorLiquido" && "Valor Líquido"}
                    {key === "custoConsultoria" && "Custo Consultoria"}
                  </span>
                  <span className="text-base font-bold">{value}</span>
                </div>
              ))}
          </div>
        </div>

        {/* Fórmulas */}
        <div className="card-gradient rounded-xl p-4 border border-border/50">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong>Fórmulas:</strong> Total Financiado = Saldo + Liberado |
            Valor Líquido = Liberado - Seguro | Custo = Total × % | Cliente =
            Líquido - Custo
          </p>
        </div>
      </main>

      <MobileNav />
    </div>
  );
}
