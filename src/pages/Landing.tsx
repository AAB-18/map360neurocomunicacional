import { useNavigate } from "react-router-dom";
import { PublicLayout } from "@/components/PublicLayout";
import { Step2Info } from "@/components/Step2Info";
import tutorsTechLogo from "@/assets/tutors-tech-logo.jpeg";

export default function Landing() {
  const nav = useNavigate();
  return (
    <PublicLayout>
      <div className="text-center mb-8">
        <img
          src={tutorsTechLogo}
          alt="Tutor's Tech Logo"
          className="w-20 h-20 mx-auto mb-4 object-contain"
        />
        <h1 className="text-base font-extrabold mb-1">
          <span className="text-foreground">Qual é o seu Estilo de Carisma?</span>
        </h1>
        <p className="text-primary neon-text font-semibold text-sm mb-3">
          MAP360 - NeuroComunicacional
        </p>
        <p className="text-muted-foreground text-sm">
          Descubra como seu cérebro influencia sua presença, impacto e poder de conexão.
        </p>
      </div>
      <Step2Info onNext={() => nav("/acesso")} />
    </PublicLayout>
  );
}
