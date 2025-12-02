import { Brain } from "lucide-react";
import { NeonButton } from "./NeonButton";
import { CHARISMA_STYLES } from "@/data/charismaData";

interface Step2InfoProps {
  onNext: () => void;
}

export const Step2Info = ({ onNext }: Step2InfoProps) => (
  <div className="space-y-6 animate-fadeIn">
    <h2 className="text-2xl font-bold text-center mb-6 text-foreground border-b border-border pb-4">
      Os 6 Estilos de <span className="text-primary">Carisma</span>
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
      {CHARISMA_STYLES.map((style) => (
        <div
          key={style.id}
          className="bg-background p-5 rounded-lg border border-border hover:border-primary transition-all group"
        >
          <h3 className="text-primary font-bold text-lg mb-2 group-hover:text-foreground transition-colors">
            {style.id}. {style.title}
          </h3>
          <p className="text-foreground/80 text-sm mb-3">{style.desc}</p>
          <div className="text-xs text-foreground font-mono bg-muted p-2 rounded border-l-2 border-primary">
            {style.axis}
          </div>
        </div>
      ))}
    </div>

    <NeonButton onClick={onNext}>
      Iniciar Teste <Brain className="inline-block ml-2 w-5 h-5" />
    </NeonButton>
  </div>
);
