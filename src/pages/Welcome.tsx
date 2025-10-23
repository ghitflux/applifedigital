import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageTransition } from "@/components/animations/PageTransition";
import { motion } from "framer-motion";

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
    <PageTransition variant="fade">
      <div className="min-h-screen flex flex-col bg-background">
        {/* Hero Section */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
          <div className="w-full max-w-md space-y-8">
          {/* Logo/Icon */}
          <motion.div
            className="flex justify-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "backOut" }}
          >
            <div className="relative">
              <div className="absolute inset-0 glow rounded-full" />
              <div className="relative w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center">
                <TrendingUp className="h-12 w-12 text-primary-foreground" />
              </div>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div
            className="text-center space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold">
              Life <span className="text-gradient">Digital</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Simule seu empréstimo consignado e quite suas dívidas com as melhores condições
            </p>
          </motion.div>

          {/* Features */}
          <div className="space-y-4 pt-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  className="flex items-start gap-4 p-4 rounded-xl bg-card/50 border border-border/50"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
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
                </motion.div>
              );
            })}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.4 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              className="w-full h-14 text-lg font-semibold rounded-xl bg-gradient-primary hover:opacity-90 transition-opacity"
              onClick={() => navigate("/auth")}
            >
              Começar Agora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>

          <motion.p
            className="text-center text-xs text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.4 }}
          >
            Ao continuar, você concorda com nossos{" "}
            <button className="text-primary hover:underline">Termos de Uso</button> e{" "}
            <button className="text-primary hover:underline">Política de Privacidade</button>
          </motion.p>
        </div>
      </div>
    </div>
    </PageTransition>
  );
}
