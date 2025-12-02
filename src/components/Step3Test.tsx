import { CheckCircle } from "lucide-react";
import { NeonButton } from "./NeonButton";
import { QUESTIONS, CharismaType } from "@/data/charismaData";

interface Step3TestProps {
  answers: Record<number, CharismaType>;
  onAnswer: (questionId: number, type: CharismaType) => void;
  onFinish: () => void;
}

export const Step3Test = ({ answers, onAnswer, onFinish }: Step3TestProps) => {
  const allAnswered = Object.keys(answers).length === QUESTIONS.length;
  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / QUESTIONS.length) * 100;

  return (
    <div className="space-y-8 animate-fadeIn pb-10">
      <div className="sticky top-0 bg-background/90 backdrop-blur z-10 pb-4 pt-2 border-b border-border">
        <div className="flex justify-between items-end mb-2">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground leading-none">
              MAP - Mapeamento
            </h2>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-1">
              Neurocomportamental
            </h2>
            <p className="text-primary font-medium text-sm tracking-wide">Estilo de Carisma</p>
          </div>
          <span className="text-primary font-mono text-lg font-bold">
            {answeredCount}/{QUESTIONS.length}
          </span>
        </div>
        <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
          <div
            className="bg-primary h-full transition-all duration-500 ease-out neon-border"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="space-y-10">
        {QUESTIONS.map((q) => (
          <div key={q.id} className="space-y-4">
            <h3 className="text-lg text-foreground font-medium flex gap-3">
              <span className="text-primary font-bold text-xl">{q.id}.</span>
              {q.text}
            </h3>
            <div className="grid grid-cols-1 gap-3 pl-8">
              {q.options.map((opt, idx) => {
                const isSelected = answers[q.id] === opt.type;
                return (
                  <button
                    key={idx}
                    onClick={() => onAnswer(q.id, opt.type)}
                    className={`
                      text-left p-4 rounded-lg text-sm transition-all duration-200 border
                      ${
                        isSelected
                          ? "bg-primary/10 border-primary text-foreground neon-border"
                          : "bg-muted border-border text-muted-foreground hover:border-muted-foreground hover:text-foreground"
                      }
                    `}
                  >
                    {opt.text}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-6">
        <NeonButton onClick={onFinish} disabled={!allAnswered}>
          Finalizar Teste <CheckCircle className="inline-block ml-2 w-5 h-5" />
        </NeonButton>
        {!allAnswered && (
          <p className="text-center text-xs text-muted-foreground mt-2">
            Responda todas as perguntas para finalizar.
          </p>
        )}
      </div>
    </div>
  );
};
