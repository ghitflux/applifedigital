import { MobileNav } from "@/components/layout/MobileNav";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, CheckCircle2, Clock, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MeusDocumentos() {
  const navigate = useNavigate();

  const documentos = [
    {
      tipo: "Contracheque",
      data: "15 Out 2025",
      status: "aprovado",
    },
    {
      tipo: "Contracheque",
      data: "15 Set 2025",
      status: "aprovado",
    },
    {
      tipo: "Documento de Identidade",
      data: "01 Out 2025",
      status: "em_analise",
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
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
          <h1 className="text-2xl font-bold">Meus Documentos</h1>
        </div>
      </header>

      <main className="px-6 pt-6 space-y-4">
        <Button
          className="w-full h-12 bg-gradient-primary hover:opacity-90"
          onClick={() => navigate("/enviar-documento")}
        >
          <Upload className="mr-2 h-4 w-4" />
          Enviar Novo Documento
        </Button>

        <div className="space-y-3">
          {documentos.map((doc, index) => (
            <div
              key={index}
              className="card-gradient rounded-xl p-4 border border-border/50"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">{doc.tipo}</h3>
                  <p className="text-xs text-muted-foreground">{doc.data}</p>
                </div>
                <div>
                  {doc.status === "aprovado" ? (
                    <CheckCircle2 className="h-5 w-5 text-success" />
                  ) : (
                    <Clock className="h-5 w-5 text-warning" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <MobileNav />
    </div>
  );
}
