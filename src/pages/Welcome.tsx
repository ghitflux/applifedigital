import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: "100% Seguro",
      description: "Seus dados protegidos com criptografia de ponta",
    },
    {
      icon: Zap,
      title: "Rápido e Fácil",
      description: "Simulação aprovada em minutos",
    },
    {
      icon: TrendingUp,
      title: "Melhores Taxas",
      description: "Condições especiais para você",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo/Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 glow rounded-full" />
              <div className="relative w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center">
                <TrendingUp className="h-12 w-12 text-primary-foreground" />
              </div>
            </div>
          </div>

          {/* Heading */}
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-bold">
              Life <span className="text-gradient">Digital</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Simule seu empréstimo consignado e quite suas dívidas com as melhores condições
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4 pt-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="flex items-start gap-4 p-4 rounded-xl bg-card/50 border border-border/50"
                >
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{feature.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA Button */}
          <Button
            size="lg"
            className="w-full h-14 text-lg font-semibold rounded-xl bg-gradient-primary hover:opacity-90 transition-opacity"
            onClick={() => navigate("/dashboard")}
          >
            Começar Agora
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            Ao continuar, você concorda com nossos{" "}
            <button className="text-primary hover:underline">Termos de Uso</button> e{" "}
            <button className="text-primary hover:underline">Política de Privacidade</button>
          </p>
        </div>
      </div>
    </div>
  );
}
