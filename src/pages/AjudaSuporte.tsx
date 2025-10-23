import { MobileNav } from "@/components/layout/MobileNav";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageCircle, Mail, Phone, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function AjudaSuporte() {
  const navigate = useNavigate();

  const faqs = [
    {
      pergunta: "Como solicitar uma simulação?",
      resposta:
        "Vá até a página inicial e clique em 'Nova Simulação'. Preencha os dados solicitados e aguarde a análise.",
    },
    {
      pergunta: "Quanto tempo leva para receber o resultado?",
      resposta:
        "A análise leva em média de 2 a 4 horas úteis. Você será notificado assim que o resultado estiver disponível.",
    },
    {
      pergunta: "Quais documentos são necessários?",
      resposta:
        "Você precisará enviar seu contracheque recente (últimos 3 meses) e documento de identidade.",
    },
    {
      pergunta: "A simulação afeta meu score de crédito?",
      resposta:
        "Não, a simulação não impacta seu score de crédito. É apenas uma análise preliminar.",
    },
  ];

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
          <h1 className="text-2xl font-bold">Ajuda e Suporte</h1>
        </div>
      </header>

      <main className="px-6 pt-6 space-y-6">
        {/* Canais de Contato */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Entre em Contato</h2>
          
          <Button
            variant="outline"
            className="w-full h-16 justify-start gap-4"
          >
            <div className="p-2 rounded-lg bg-primary/10">
              <MessageCircle className="h-5 w-5 text-primary" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-sm">Chat Online</p>
              <p className="text-xs text-muted-foreground">
                Atendimento imediato
              </p>
            </div>
          </Button>

          <Button
            variant="outline"
            className="w-full h-16 justify-start gap-4"
          >
            <div className="p-2 rounded-lg bg-primary/10">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-sm">Email</p>
              <p className="text-xs text-muted-foreground">
                suporte@lifedigital.com.br
              </p>
            </div>
          </Button>

          <Button
            variant="outline"
            className="w-full h-16 justify-start gap-4"
          >
            <div className="p-2 rounded-lg bg-primary/10">
              <Phone className="h-5 w-5 text-primary" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-sm">Telefone</p>
              <p className="text-xs text-muted-foreground">
                0800 123 4567
              </p>
            </div>
          </Button>
        </div>

        {/* FAQ */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Perguntas Frequentes</h2>
          </div>
          
          <div className="card-gradient rounded-xl border border-border/50 overflow-hidden">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="px-5 py-4 hover:no-underline">
                    {faq.pergunta}
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-4 text-sm text-muted-foreground">
                    {faq.resposta}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  );
}
