import { useState, useEffect } from "react";
import { Brain, Activity, Send } from "lucide-react";
import { NeonButton } from "./NeonButton";
import { CharismaResult, FormData } from "@/data/charismaData";

interface Step4ResultProps {
  result: CharismaResult;
  formData: FormData;
  onReset: () => void;
}

export const Step4Result = ({ result, formData, onReset }: Step4ResultProps) => {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const getWhatsAppLink = (phone: string, text: string) => {
    const cleanPhone = phone.replace(/\D/g, "");
    const encodedText = encodeURIComponent(text);
    return `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodedText}`;
  };

  const resultText = `Olá! Meu nome é *${formData.name}* (${formData.profession}).\n\nAcabei de realizar o teste de Carisma Neurocomunicacional.\n\n🏆 *MEU RESULTADO: ${result.title}*\n\n🧠 *Cérebro Dominante:* ${result.brain}\n💪 *Ponto Forte:* ${result.strength}\n\nContato do usuário: ${formData.whatsapp}`;

  const adminPhone = "5511985870689";

  const handleSendAndReset = () => {
    window.open(getWhatsAppLink(adminPhone, resultText), "_blank");
    setTimeout(() => {
      onReset();
    }, 1000);
  };

  return (
    <div className="space-y-8 animate-fadeIn text-center">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center opacity-20">
          <div className="w-full h-full bg-glow-red animate-pulse"></div>
        </div>
      )}

      <div className="inline-block p-4 rounded-full bg-muted border-2 border-primary neon-border-strong mb-4">
        <Brain size={48} className="text-primary" />
      </div>

      <div>
        <h2 className="text-sm text-muted-foreground uppercase tracking-widest mb-2">
          Seu Estilo Predominante é
        </h2>
        <h1 className="text-3xl md:text-5xl font-extrabold text-foreground drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
          {result.title}
        </h1>
      </div>

      <div className="bg-muted/80 border border-border p-8 rounded-xl relative overflow-hidden group hover:border-primary/50 transition-colors">
        <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>

        <p className="text-xl text-foreground italic mb-6">"{result.description}"</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mt-8">
          <div className="bg-background/50 p-4 rounded border border-border">
            <h4 className="flex items-center text-primary font-bold mb-2">
              <Activity className="w-4 h-4 mr-2" /> Ponto Forte
            </h4>
            <p className="text-foreground/80">{result.strength}</p>
          </div>
          <div className="bg-background/50 p-4 rounded border border-border">
            <h4 className="flex items-center text-primary font-bold mb-2">
              <Brain className="w-4 h-4 mr-2" /> Cérebro Dominante
            </h4>
            <p className="text-foreground/80">{result.brain}</p>
          </div>
        </div>
      </div>

      <div className="space-y-3 pt-6">
        <p className="text-sm text-muted-foreground mb-4">
          Clique abaixo para enviar o resultado e finalizar:
        </p>

        <NeonButton onClick={handleSendAndReset}>
          <span className="flex items-center justify-center">
            ENVIAR RESULTADO <Send className="ml-2 w-4 h-4" />
          </span>
        </NeonButton>
      </div>
    </div>
  );
};
