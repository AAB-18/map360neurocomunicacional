import { useState, useEffect } from "react";
import { Brain, Activity, Send, Lightbulb, Users, AlertTriangle, Target, Star, MessageCircle, Briefcase } from "lucide-react";
import { NeonButton } from "./NeonButton";
import { ProfileRadarChart } from "./ProfileRadarChart";
import { CharismaResult, FormData, ProfileScores } from "@/data/charismaData";

// Import images
import carismaSensivel from "@/assets/carisma-sensivel.png";
import carismaRacional from "@/assets/carisma-racional.png";
import carismaVibrante from "@/assets/carisma-vibrante.png";
import carismaSereno from "@/assets/carisma-sereno.png";

const imageMap: Record<string, string> = {
  'carisma-sensivel': carismaSensivel,
  'carisma-racional': carismaRacional,
  'carisma-vibrante': carismaVibrante,
  'carisma-sereno': carismaSereno,
};

interface Step4ResultProps {
  result: CharismaResult;
  formData: FormData;
  scores: ProfileScores;
  onReset: () => void;
}

export const Step4Result = ({ result, formData, scores, onReset }: Step4ResultProps) => {
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

  const generateFullReport = () => {
    return `🧠 *RELATÓRIO COMPLETO - MAPEAMENTO NEUROCOMUNICACIONAL*

👤 *DADOS DO PARTICIPANTE*
• Nome: ${formData.name}
• Profissão: ${formData.profession}
• Escolaridade: ${formData.education}
• Contato: ${formData.whatsapp}
• Email: ${formData.email}

━━━━━━━━━━━━━━━━━━━━━━━

🏆 *RESULTADO: ${result.title}*

📊 *PONTUAÇÃO POR DIMENSÃO*
• Sensível-Empático: ${scores.S} pontos
• Neuroracional: ${scores.R} pontos
• Vibrante-Entusiasmado: ${scores.V} pontos
• Sereno-Profundo: ${scores.P} pontos

━━━━━━━━━━━━━━━━━━━━━━━

📝 *DESCRIÇÃO DO PERFIL*
"${result.description}"

🧠 *Cérebro Dominante:* ${result.brain}
💪 *Ponto Forte:* ${result.strength}

━━━━━━━━━━━━━━━━━━━━━━━

⭐ *CARACTERÍSTICAS PRINCIPAIS*
${result.characteristics.map(c => `• ${c}`).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━

💬 *ESTILO DE COMUNICAÇÃO*
${result.communicationStyle}

━━━━━━━━━━━━━━━━━━━━━━━

🏢 *AMBIENTE IDEAL*
${result.idealEnvironment}

━━━━━━━━━━━━━━━━━━━━━━━

⚠️ *PONTOS DE ATENÇÃO*
${result.challenges}

━━━━━━━━━━━━━━━━━━━━━━━

🎯 *DICAS DE DESENVOLVIMENTO*
${result.developmentTips.map(t => `• ${t}`).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━

👥 *PERSONALIDADES COM ESTE CARISMA*
${result.famousExamples.join(', ')}

━━━━━━━━━━━━━━━━━━━━━━━

_Mapeamento realizado pela Tutor's Tech_
_www.tutorstech.com.br_`;
  };

  const adminPhone = "5511985870689";
  const userPhone = formData.whatsapp;
  const fullReport = generateFullReport();

  const handleSendToAdmin = () => {
    window.open(getWhatsAppLink(adminPhone, fullReport), "_blank");
  };

  const handleSendToUser = () => {
    window.open(getWhatsAppLink(userPhone, fullReport), "_blank");
  };

  const handleSendBoth = () => {
    handleSendToAdmin();
    setTimeout(() => {
      handleSendToUser();
    }, 1500);
    setTimeout(() => {
      onReset();
    }, 3000);
  };

  const personalityImage = imageMap[result.image];

  return (
    <div className="space-y-8 animate-fadeIn">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center opacity-20">
          <div className="w-full h-full bg-glow-red animate-pulse"></div>
        </div>
      )}

      {/* Header with Image */}
      <div className="text-center">
        {personalityImage && (
          <div className="mb-6">
            <img 
              src={personalityImage} 
              alt={result.title}
              className="w-48 h-48 mx-auto rounded-full border-4 border-primary shadow-lg shadow-primary/30"
            />
          </div>
        )}

        <div className="inline-block p-4 rounded-full bg-muted border-2 border-primary neon-border-strong mb-4">
          <Brain size={48} className="text-primary" />
        </div>

        <h2 className="text-sm text-muted-foreground uppercase tracking-widest mb-2">
          Seu Estilo Predominante é
        </h2>
        <h1 className="text-3xl md:text-5xl font-extrabold text-foreground drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
          {result.title}
        </h1>
      </div>

      {/* Radar Chart */}
      <div className="bg-muted/80 border border-border p-6 rounded-xl">
        <h4 className="text-center text-primary font-bold mb-4 text-lg">
          Seu Perfil Neurocomunicacional
        </h4>
        <ProfileRadarChart scores={scores} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4 text-center">
          <div className="bg-background/50 p-2 rounded-lg">
            <div className="text-primary font-bold text-lg">{scores.S}</div>
            <div className="text-xs text-muted-foreground">Sensível</div>
          </div>
          <div className="bg-background/50 p-2 rounded-lg">
            <div className="text-primary font-bold text-lg">{scores.R}</div>
            <div className="text-xs text-muted-foreground">Racional</div>
          </div>
          <div className="bg-background/50 p-2 rounded-lg">
            <div className="text-primary font-bold text-lg">{scores.V}</div>
            <div className="text-xs text-muted-foreground">Vibrante</div>
          </div>
          <div className="bg-background/50 p-2 rounded-lg">
            <div className="text-primary font-bold text-lg">{scores.P}</div>
            <div className="text-xs text-muted-foreground">Sereno</div>
          </div>
        </div>
      </div>

      {/* Description Card */}
      <div className="bg-muted/80 border border-border p-8 rounded-xl relative overflow-hidden group hover:border-primary/50 transition-colors">
        <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
        <p className="text-xl text-foreground italic">"{result.description}"</p>
      </div>

      {/* Main Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-muted/80 p-5 rounded-xl border border-border hover:border-primary/50 transition-colors">
          <h4 className="flex items-center text-primary font-bold mb-3">
            <Activity className="w-5 h-5 mr-2" /> Ponto Forte
          </h4>
          <p className="text-foreground/90">{result.strength}</p>
        </div>
        <div className="bg-muted/80 p-5 rounded-xl border border-border hover:border-primary/50 transition-colors">
          <h4 className="flex items-center text-primary font-bold mb-3">
            <Brain className="w-5 h-5 mr-2" /> Cérebro Dominante
          </h4>
          <p className="text-foreground/90">{result.brain}</p>
        </div>
      </div>

      {/* Characteristics */}
      <div className="bg-muted/80 p-6 rounded-xl border border-border">
        <h4 className="flex items-center text-primary font-bold mb-4 text-lg">
          <Star className="w-5 h-5 mr-2" /> Características Principais
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {result.characteristics.map((char, index) => (
            <div key={index} className="flex items-center bg-background/50 p-3 rounded-lg border border-border/50">
              <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
              <span className="text-foreground/90 text-sm">{char}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Communication Style */}
      <div className="bg-muted/80 p-6 rounded-xl border border-border">
        <h4 className="flex items-center text-primary font-bold mb-4 text-lg">
          <MessageCircle className="w-5 h-5 mr-2" /> Estilo de Comunicação
        </h4>
        <p className="text-foreground/90 leading-relaxed">{result.communicationStyle}</p>
      </div>

      {/* Ideal Environment */}
      <div className="bg-muted/80 p-6 rounded-xl border border-border">
        <h4 className="flex items-center text-primary font-bold mb-4 text-lg">
          <Briefcase className="w-5 h-5 mr-2" /> Ambiente Ideal
        </h4>
        <p className="text-foreground/90 leading-relaxed">{result.idealEnvironment}</p>
      </div>

      {/* Challenges */}
      <div className="bg-muted/80 p-6 rounded-xl border border-border border-l-4 border-l-yellow-500">
        <h4 className="flex items-center text-yellow-500 font-bold mb-4 text-lg">
          <AlertTriangle className="w-5 h-5 mr-2" /> Pontos de Atenção
        </h4>
        <p className="text-foreground/90 leading-relaxed">{result.challenges}</p>
      </div>

      {/* Development Tips */}
      <div className="bg-muted/80 p-6 rounded-xl border border-border">
        <h4 className="flex items-center text-primary font-bold mb-4 text-lg">
          <Target className="w-5 h-5 mr-2" /> Dicas de Desenvolvimento
        </h4>
        <div className="space-y-3">
          {result.developmentTips.map((tip, index) => (
            <div key={index} className="flex items-start bg-background/50 p-3 rounded-lg border border-border/50">
              <Lightbulb className="w-4 h-4 text-primary mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-foreground/90 text-sm">{tip}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Famous Examples */}
      <div className="bg-muted/80 p-6 rounded-xl border border-border">
        <h4 className="flex items-center text-primary font-bold mb-4 text-lg">
          <Users className="w-5 h-5 mr-2" /> Personalidades com este Carisma
        </h4>
        <div className="flex flex-wrap gap-3">
          {result.famousExamples.map((example, index) => (
            <span 
              key={index} 
              className="bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium border border-primary/30"
            >
              {example}
            </span>
          ))}
        </div>
      </div>

      {/* Botão Finalizar */}
      <div className="pt-6">
        <NeonButton onClick={handleSendBoth}>
          <span className="flex items-center justify-center">
            FINALIZAR TESTE <Send className="ml-2 w-4 h-4" />
          </span>
        </NeonButton>
        <p className="text-center text-sm text-muted-foreground mt-3">
          O relatório será enviado para você e para a Tutor's Tech
        </p>
      </div>
    </div>
  );
};
