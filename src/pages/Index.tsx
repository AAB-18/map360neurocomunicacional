import { useState } from "react";
import { Step1Form } from "@/components/Step1Form";
import { Step2Info } from "@/components/Step2Info";
import { Step3Test } from "@/components/Step3Test";
import { Step4Result } from "@/components/Step4Result";
import { FormData, CharismaType, RESULTS, CharismaResult, ProfileScores } from "@/data/charismaData";

const Index = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    whatsapp: "",
    profession: "",
    education: "",
    lgpd: false,
  });
  const [answers, setAnswers] = useState<Record<number, CharismaType>>({});
  const [selectedOptions, setSelectedOptions] = useState<Record<number, number>>({});
  const [finalResult, setFinalResult] = useState<CharismaResult | null>(null);
  const [scores, setScores] = useState<ProfileScores>({ S: 0, R: 0, V: 0, P: 0 });

  const handleFormChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAnswer = (questionId: number, type: CharismaType, optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: type }));
    setSelectedOptions((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const calculateResult = () => {
    const counts: ProfileScores = { S: 0, R: 0, V: 0, P: 0 };
    Object.values(answers).forEach((type) => {
      counts[type]++;
    });
    setScores(counts);
    const winnerType = (Object.keys(counts) as CharismaType[]).reduce((a, b) =>
      counts[a] > counts[b] ? a : b
    );
    setFinalResult(RESULTS[winnerType]);
    setStep(4);
    window.scrollTo(0, 0);
  };

  const resetApp = () => {
    setStep(1);
    setFormData({
      name: "",
      email: "",
      whatsapp: "",
      profession: "",
      education: "",
      lgpd: false,
    });
    setAnswers({});
    setSelectedOptions({});
    setFinalResult(null);
    setScores({ S: 0, R: 0, V: 0, P: 0 });
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Background glow effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary opacity-[0.03] rounded-full blur-[100px] transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary opacity-[0.02] rounded-full blur-[80px] transform -translate-x-1/3 translate-y-1/3"></div>
      </div>

      <div className="relative max-w-3xl mx-auto px-6 py-12 min-h-screen flex flex-col justify-center">
        {step === 1 && (
          <Step1Form
            data={formData}
            onChange={handleFormChange}
            onNext={() => {
              setStep(2);
              window.scrollTo(0, 0);
            }}
          />
        )}

        {step === 2 && (
          <Step2Info
            onNext={() => {
              setStep(3);
              window.scrollTo(0, 0);
            }}
          />
        )}

        {step === 3 && (
          <Step3Test 
            answers={answers} 
            selectedOptions={selectedOptions}
            onAnswer={handleAnswer} 
            onFinish={calculateResult} 
          />
        )}

        {step === 4 && finalResult && (
          <Step4Result result={finalResult} formData={formData} scores={scores} onReset={resetApp} />
        )}

        <footer className="mt-12 text-center text-xs text-muted py-4">
          &copy; {new Date().getFullYear()} Carisma Neurocomunicacional. Todos os direitos
          reservados.
        </footer>
      </div>
    </div>
  );
};

export default Index;
