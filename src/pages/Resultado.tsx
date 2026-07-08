import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Send, Brain, Activity, Star, MessageCircle, Users } from "lucide-react";
import { PublicLayout } from "@/components/PublicLayout";
import { NeonButton } from "@/components/NeonButton";
import { ProfileRadarChart } from "@/components/ProfileRadarChart";
import { RESULTS, CharismaType, ProfileScores } from "@/data/charismaData";
import { getParticipantSession, clearParticipantSession } from "@/lib/participantSession";

import carismaSensivel from "@/assets/carisma-sensivel.png";
import carismaRacional from "@/assets/carisma-racional.png";
import carismaVibrante from "@/assets/carisma-vibrante.png";
import carismaSereno from "@/assets/carisma-sereno.png";

const imageMap: Record<string, string> = {
  S: carismaSensivel, R: carismaRacional, V: carismaVibrante, P: carismaSereno,
};

const ADMIN_PHONE = "5511985870689";

export default function Resultado() {
  const nav = useNavigate();
  const [scores, setScores] = useState<ProfileScores | null>(null);
  const [dominant, setDominant] = useState<CharismaType | null>(null);
  const [session, setSession] = useState<ReturnType<typeof getParticipantSession>>(null);

  useEffect(() => {
    const s = getParticipantSession();
    const raw = sessionStorage.getItem("map360_last_result");
    if (!s || !raw) {
      nav("/");
      return;
    }
    const parsed = JSON.parse(raw);
    setScores(parsed.scores);
    setDominant(parsed.dominant);
    setSession(s);
  }, [nav]);

  if (!scores || !dominant || !session) return null;

  const result = RESULTS[dominant];
  const image = imageMap[dominant];

  const summaryText = `🧠 *MAP360 - NeuroComunicacional*

*${session.name}*
Perfil predominante: *${result.title}*

📊 Scores:
• S (Sensível): ${scores.S}
• R (Racional): ${scores.R}
• V (Vibrante): ${scores.V}
• P (Sereno): ${scores.P}

📝 ${result.description}

⭐ Destaques:
${result.characteristics.slice(0, 3).map((c) => `• ${c}`).join("\n")}

💡 Orientação para devolutiva: Explore como este perfil se manifesta no seu dia a dia profissional, valorizando pontos fortes e desenvolvendo pontos de atenção.

_Gerado via Neurocomunicacional MAP360._`;

  const waLink = (phone: string) =>
    `https://api.whatsapp.com/send?phone=${phone.replace(/\D/g, "")}&text=${encodeURIComponent(summaryText)}`;

  const sendToBoth = () => {
    window.open(waLink(ADMIN_PHONE), "_blank");
    setTimeout(() => window.open(waLink(session.whatsapp), "_blank"), 1200);
    setTimeout(() => {
      clearParticipantSession();
      sessionStorage.removeItem("map360_last_result");
    }, 3000);
  };

  return (
    <PublicLayout>
      <div className="space-y-8 animate-fadeIn">
        <div className="text-center">
          {image && (
            <img src={image} alt={result.title} className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-2xl border-2 border-primary/30 object-cover mb-4" />
          )}
          <h2 className="text-sm text-muted-foreground uppercase tracking-widest mb-2">
            Seu Estilo Predominante é
          </h2>
          <h1 className="text-3xl md:text-5xl font-extrabold text-foreground">{result.title}</h1>
        </div>

        <div className="bg-muted/80 border border-border p-6 rounded-xl">
          <h4 className="text-center text-primary font-bold mb-4 text-lg">Seu Perfil Neurocomunicacional</h4>
          <ProfileRadarChart scores={scores} />
          <div className="grid grid-cols-4 gap-2 mt-4 text-center">
            {(["S","R","V","P"] as const).map((k) => (
              <div key={k} className="bg-background/50 p-2 rounded-lg">
                <div className="text-primary font-bold text-lg">{scores[k]}</div>
                <div className="text-xs text-muted-foreground">
                  {k === "S" ? "Sensível" : k === "R" ? "Racional" : k === "V" ? "Vibrante" : "Sereno"}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-muted/80 border border-border p-8 rounded-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
          <p className="text-xl text-foreground italic">"{result.description}"</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-muted/80 p-5 rounded-xl border border-border">
            <h4 className="flex items-center text-primary font-bold mb-3"><Activity className="w-5 h-5 mr-2" /> Ponto Forte</h4>
            <p className="text-foreground/90">{result.strength}</p>
          </div>
          <div className="bg-muted/80 p-5 rounded-xl border border-border">
            <h4 className="flex items-center text-primary font-bold mb-3"><Brain className="w-5 h-5 mr-2" /> Cérebro Dominante</h4>
            <p className="text-foreground/90">{result.brain}</p>
          </div>
        </div>

        <div className="bg-muted/80 p-6 rounded-xl border border-border">
          <h4 className="flex items-center text-primary font-bold mb-4 text-lg"><Star className="w-5 h-5 mr-2" /> Destaques</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {result.characteristics.map((c, i) => (
              <div key={i} className="flex items-center bg-background/50 p-3 rounded-lg border border-border/50">
                <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                <span className="text-foreground/90 text-sm">{c}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-muted/80 p-6 rounded-xl border border-border">
          <h4 className="flex items-center text-primary font-bold mb-4 text-lg"><MessageCircle className="w-5 h-5 mr-2" /> Estilo de Comunicação</h4>
          <p className="text-foreground/90 leading-relaxed">{result.communicationStyle}</p>
        </div>

        <div className="bg-muted/80 p-6 rounded-xl border border-border">
          <h4 className="flex items-center text-primary font-bold mb-4 text-lg"><Users className="w-5 h-5 mr-2" /> Personalidades com este Carisma</h4>
          <div className="flex flex-wrap gap-3">
            {result.famousExamples.map((e, i) => (
              <span key={i} className="bg-background/50 text-foreground/90 px-4 py-2 rounded-full text-sm font-medium border border-border/50">{e}</span>
            ))}
          </div>
        </div>

        <div className="pt-6">
          <NeonButton onClick={sendToBoth}>
            <span className="flex items-center justify-center">
              FINALIZAR E COMPARTILHAR NO WHATSAPP <Send className="ml-2 w-4 h-4" />
            </span>
          </NeonButton>
          <p className="text-center text-sm text-muted-foreground mt-3">
            O resumo será enviado para você e para a Tutor's Tech
          </p>
        </div>
      </div>
    </PublicLayout>
  );
}
