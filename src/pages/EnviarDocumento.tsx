import { useState } from "react";
import { MobileNav } from "@/components/layout/MobileNav";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Upload, FileText, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function EnviarDocumento() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      toast({
        title: "Arquivo necessário",
        description: "Por favor, selecione um arquivo",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Documento enviado!",
      description: "Seu documento está sendo processado",
    });
    
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
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
          <div>
            <h1 className="text-2xl font-bold">Enviar Documento</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Envie seu contracheque
            </p>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="px-6 pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Upload Area */}
          <div className="card-gradient rounded-2xl p-8 border-2 border-dashed border-border/50 hover:border-primary/50 transition-colors">
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <div className="p-4 rounded-2xl bg-primary/10">
                <Upload className="h-10 w-10 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">
                  {selectedFile ? "Arquivo Selecionado" : "Selecione um arquivo"}
                </h3>
                {selectedFile ? (
                  <div className="flex items-center gap-2 text-sm text-success">
                    <CheckCircle2 className="h-4 w-4" />
                    {selectedFile.name}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    PDF ou imagem até 10MB
                  </p>
                )}
              </div>
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                <FileText className="mr-2 h-4 w-4" />
                Escolher Arquivo
              </Button>
            </div>
          </div>

          {/* Info Card */}
          <div className="card-gradient rounded-xl p-4 border border-border/50">
            <h3 className="font-semibold mb-2 text-sm">Documentos Aceitos</h3>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Contracheque recente (últimos 3 meses)</li>
              <li>• Formato: PDF, JPG ou PNG</li>
              <li>• Tamanho máximo: 10MB</li>
              <li>• Documento legível e sem rasuras</li>
            </ul>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-12 bg-gradient-primary hover:opacity-90"
            disabled={!selectedFile}
          >
            Enviar Documento
          </Button>
        </form>
      </main>

      <MobileNav />
    </div>
  );
}
