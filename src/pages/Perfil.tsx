import { MobileNav } from "@/components/layout/MobileNav";
import { Button } from "@/components/ui/button";
import {
  User,
  FileText,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight,
} from "lucide-react";

const menuItems = [
  {
    icon: User,
    label: "Dados Pessoais",
    description: "CPF, WhatsApp, Email",
  },
  {
    icon: FileText,
    label: "Meus Documentos",
    description: "Contracheques, comprovantes",
  },
  {
    icon: Bell,
    label: "Notificações",
    description: "Gerencie suas preferências",
  },
  {
    icon: Shield,
    label: "Segurança e Privacidade",
    description: "Senha, autenticação",
  },
  {
    icon: HelpCircle,
    label: "Ajuda e Suporte",
    description: "Central de ajuda, contato",
  },
];

export default function Perfil() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="px-6 pt-8 pb-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-2xl glow">
            J
          </div>
          <div>
            <h1 className="text-xl font-bold">João Silva</h1>
            <p className="text-sm text-muted-foreground mt-1">
              joao.silva@email.com
            </p>
          </div>
          <div className="flex gap-4 pt-2">
            <div className="text-center">
              <p className="text-2xl font-bold text-gradient">3</p>
              <p className="text-xs text-muted-foreground">Simulações</p>
            </div>
            <div className="w-px bg-border" />
            <div className="text-center">
              <p className="text-2xl font-bold text-gradient">R$ 5.240</p>
              <p className="text-xs text-muted-foreground">Margem</p>
            </div>
          </div>
        </div>
      </header>

      {/* Menu Items */}
      <main className="px-6 space-y-6">
        <section className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className="w-full flex items-center gap-4 p-4 rounded-xl bg-card/50 border border-border/50 hover:border-primary/50 transition-all text-left"
              >
                <div className="p-2 rounded-lg bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">{item.label}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {item.description}
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>
            );
          })}
        </section>

        {/* Version Info */}
        <div className="text-center space-y-2">
          <p className="text-xs text-muted-foreground">
            Versão 1.0.0
          </p>
        </div>

        {/* Logout Button */}
        <Button
          variant="outline"
          className="w-full border-destructive/50 text-destructive hover:bg-destructive/10"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sair da Conta
        </Button>
      </main>

      <MobileNav />
    </div>
  );
}
