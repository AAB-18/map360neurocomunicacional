import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PublicLayout } from "@/components/PublicLayout";
import { Step3Test } from "@/components/Step3Test";
import { CharismaType, QUESTIONS } from "@/data/charismaData";
import { getParticipantSession } from "@/lib/participantSession";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function Teste() {
  const nav = useNavigate();
  const [answers, setAnswers] = useState<Record<number, CharismaType>>({});
  const [selectedOptions, setSelectedOptions] = useState<Record<number, number>>({});

  useEffect(() => {
    if (!getParticipantSession()) {
      toast.error("Sessão não encontrada. Faça o cadastro primeiro.");
      nav("/acesso");
    }
  }, [nav]);

  const onAnswer = (qid: number, type: CharismaType, idx: number) => {
    setAnswers((p) => ({ ...p, [qid]: type }));
    setSelectedOptions((p) => ({ ...p, [qid]: idx }));
  };

  const onFinish = async () => {
    const session = getParticipantSession();
    if (!session) return nav("/acesso");
    if (Object.keys(answers).length !== QUESTIONS.length) return;

    try {
      const { data, error } = await supabase.functions.invoke("submit-result", {
        body: { participantId: session.participantId, answers },
      });
      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);
      const { dominant, scores } = data as any;
      sessionStorage.setItem(
        "map360_last_result",
        JSON.stringify({ dominant, scores })
      );
      nav("/resultado");
    } catch (e: any) {
      toast.error(e?.message || "Erro ao enviar respostas.");
    }
  };

  return (
    <PublicLayout>
      <Step3Test
        answers={answers}
        selectedOptions={selectedOptions}
        onAnswer={onAnswer}
        onFinish={onFinish}
      />
    </PublicLayout>
  );
}
