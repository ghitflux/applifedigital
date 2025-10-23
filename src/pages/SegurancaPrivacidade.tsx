import { MobileNav } from "@/components/layout/MobileNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Shield, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";

export default function SegurancaPrivacidade() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Senha alterada!",
      description: "Sua senha foi atualizada com sucesso",
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="px-6 pt-8 pb-6 border-b border-border">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="hover:bg-primary/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Segurança e Privacidade</h1>
        </div>
      </header>

      <main className="px-6 pt-6 space-y-6">
        {/* Alterar Senha */}
        <div className="card-gradient rounded-xl p-5 border border-border/50">
          <div className="flex items-center gap-3 mb-4">
            <Lock className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Alterar Senha</h2>
          </div>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="senhaAtual">Senha Atual</Label>
              <Input id="senhaAtual" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="novaSenha">Nova Senha</Label>
              <Input id="novaSenha" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmarSenha">Confirmar Nova Senha</Label>
              <Input id="confirmarSenha" type="password" />
            </div>
            <Button type="submit" className="w-full">
              Alterar Senha
            </Button>
          </form>
        </div>

        {/* Configurações de Privacidade */}
        <div className="card-gradient rounded-xl p-5 border border-border/50">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Privacidade</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Notificações por Email</p>
                <p className="text-xs text-muted-foreground">
                  Receber atualizações por email
                </p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Notificações Push</p>
                <p className="text-xs text-muted-foreground">
                  Receber notificações no dispositivo
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Análise de Uso</p>
                <p className="text-xs text-muted-foreground">
                  Ajudar a melhorar o app
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  );
}
