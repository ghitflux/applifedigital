import { MobileNav } from "@/components/layout/MobileNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function DadosPessoais() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Dados atualizados!",
      description: "Suas informações foram salvas com sucesso",
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
          <h1 className="text-2xl font-bold">Dados Pessoais</h1>
        </div>
      </header>

      <main className="px-6 pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome Completo</Label>
            <Input id="nome" placeholder="João Silva" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cpf">CPF</Label>
            <Input id="cpf" placeholder="000.000.000-00" disabled />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="joao@email.com" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="telefone">Telefone</Label>
            <Input id="telefone" placeholder="(11) 99999-9999" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dataNascimento">Data de Nascimento</Label>
            <Input id="dataNascimento" type="date" />
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-gradient-primary hover:opacity-90"
          >
            Salvar Alterações
          </Button>
        </form>
      </main>

      <MobileNav />
    </div>
  );
}
