import { MobileNav } from "@/components/layout/MobileNav";
import { CheckCircle2, Clock, FileText, Bell } from "lucide-react";

const notificacoes = [
  {
    id: 1,
    tipo: "aprovacao",
    titulo: "Simulação Aprovada!",
    mensagem: "Sua simulação #1233 foi aprovada. Revise os termos e prossiga.",
    data: "Há 2 horas",
    lida: false,
  },
  {
    id: 2,
    tipo: "documento",
    titulo: "Documento Verificado",
    mensagem: "Seu contracheque foi verificado com sucesso.",
    data: "Hoje, 14:30",
    lida: false,
  },
  {
    id: 3,
    tipo: "analise",
    titulo: "Simulação em Análise",
    mensagem: "Sua solicitação #1234 está sendo analisada pela equipe.",
    data: "Ontem, 18:45",
    lida: true,
  },
  {
    id: 4,
    tipo: "geral",
    titulo: "Bem-vindo!",
    mensagem: "Seja bem-vindo ao nosso app de crédito consignado.",
    data: "15 Out 2025",
    lida: true,
  },
];

const tipoConfig = {
  aprovacao: {
    icon: CheckCircle2,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  documento: {
    icon: FileText,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  analise: {
    icon: Clock,
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  geral: {
    icon: Bell,
    color: "text-muted-foreground",
    bgColor: "bg-muted",
  },
};

export default function Notificacoes() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="px-6 pt-8 pb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Notificações</h1>
            <p className="text-sm text-muted-foreground mt-1">
              2 não lidas
            </p>
          </div>
          <button className="text-sm text-primary hover:underline">
            Marcar todas como lidas
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="px-6 space-y-3">
        {notificacoes.map((notificacao) => {
          const config = tipoConfig[notificacao.tipo as keyof typeof tipoConfig];
          const NotifIcon = config.icon;

          return (
            <div
              key={notificacao.id}
              className={`relative p-4 rounded-xl border transition-all ${
                notificacao.lida
                  ? "bg-card/30 border-border/30"
                  : "bg-card/50 border-border/50 hover:border-primary/50"
              }`}
            >
              {!notificacao.lida && (
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary" />
              )}

              <div className="flex gap-4">
                <div className={`p-2 rounded-lg ${config.bgColor} h-fit`}>
                  <NotifIcon className={`h-5 w-5 ${config.color}`} />
                </div>

                <div className="flex-1 space-y-1">
                  <h3 className={`font-semibold text-sm ${!notificacao.lida ? "" : "text-muted-foreground"}`}>
                    {notificacao.titulo}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {notificacao.mensagem}
                  </p>
                  <p className="text-xs text-muted-foreground/70">
                    {notificacao.data}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </main>

      <MobileNav />
    </div>
  );
}
