import { ChevronRight, Lock } from "lucide-react";
import { NeonButton } from "./NeonButton";
import { FormData } from "@/data/charismaData";
import tutorsTechLogo from "@/assets/tutors-tech-logo.jpeg";

interface Step1FormProps {
  data: FormData;
  onChange: (field: keyof FormData, value: string | boolean) => void;
  onNext: () => void;
}

export const Step1Form = ({ data, onChange, onNext }: Step1FormProps) => {
  const isValid =
    data.name && data.email && data.whatsapp && data.profession && data.education && data.lgpd;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center mb-8">
        <img 
          src={tutorsTechLogo} 
          alt="Tutor's Tech Logo" 
          className="h-20 mx-auto mb-6"
        />
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
          <span className="text-foreground">Qual é o seu Estilo de Carisma </span>
          <span className="text-primary neon-text">Mapeamento</span>{" "}
          <span className="text-foreground">Neurocomunicacional</span>
          <span className="text-primary">?</span>
        </h1>
        <p className="text-muted-foreground mt-4">
          Descubra como seu cérebro influencia sua presença, impacto e poder de conexão.
        </p>
      </div>

      <div className="bg-card/50 p-6 rounded-xl border border-border shadow-xl backdrop-blur-sm">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-primary uppercase mb-1">
              Nome Completo
            </label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => onChange("name", e.target.value)}
              className="w-full bg-background border border-border rounded-lg p-3 text-foreground focus:border-primary focus:outline-none transition-colors"
              placeholder="Seu nome"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-primary uppercase mb-1">
              Email
            </label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => onChange("email", e.target.value)}
              className="w-full bg-background border border-border rounded-lg p-3 text-foreground focus:border-primary focus:outline-none transition-colors"
              placeholder="seu@email.com"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-primary uppercase mb-1">
              WhatsApp
            </label>
            <input
              type="tel"
              value={data.whatsapp}
              onChange={(e) => onChange("whatsapp", e.target.value)}
              className="w-full bg-background border border-border rounded-lg p-3 text-foreground focus:border-primary focus:outline-none transition-colors"
              placeholder="(XX) XXXXX-XXXX"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-primary uppercase mb-1">
                Profissão
              </label>
              <input
                type="text"
                value={data.profession}
                onChange={(e) => onChange("profession", e.target.value)}
                className="w-full bg-background border border-border rounded-lg p-3 text-foreground focus:border-primary focus:outline-none transition-colors"
                placeholder="Sua profissão"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-primary uppercase mb-1">
                Escolaridade
              </label>
              <select
                value={data.education}
                onChange={(e) => onChange("education", e.target.value)}
                className="w-full bg-background border border-border rounded-lg p-3 text-foreground focus:border-primary focus:outline-none transition-colors"
              >
                <option value="">Selecione...</option>
                <option value="Médio">Ensino Médio</option>
                <option value="Superior">Ensino Superior</option>
                <option value="Pós">Pós-Graduação/MBA</option>
                <option value="Mestrado/Doutorado">Mestrado/Doutorado</option>
              </select>
            </div>
          </div>

          <div className="flex items-start space-x-3 pt-2">
            <input
              type="checkbox"
              id="lgpd"
              checked={data.lgpd}
              onChange={(e) => onChange("lgpd", e.target.checked)}
              className="mt-1 w-5 h-5 accent-primary bg-background border-border rounded cursor-pointer"
            />
            <label htmlFor="lgpd" className="text-sm text-muted-foreground cursor-pointer select-none">
              <span className="flex items-center gap-2">
                <Lock size={14} /> LGPD:
              </span>
              Declaro que as informações acima são verdadeiras e concordo com o processamento dos
              meus dados para a geração do resultado.
            </label>
          </div>
        </div>
      </div>

      <NeonButton onClick={onNext} disabled={!isValid}>
        Avançar <ChevronRight className="inline-block ml-2 w-5 h-5" />
      </NeonButton>
    </div>
  );
};
