import { useNavigate } from "react-router-dom";
import { Brain, Layers, Target, Sparkles, ArrowRight, CheckCircle2, GraduationCap } from "lucide-react";
import { NeonButton } from "@/components/NeonButton";

export default function Landing() {
  const nav = useNavigate();

  const essencia = [
    "Padrões comunicacionais",
    "Presença",
    "Influência",
    "Clareza",
    "Impacto",
    "Conexão",
    "Segurança emocional",
    "Expressividade",
  ];

  const estrategico = [
    "Clareza sobre seu estilo comunicacional",
    "Melhor tomada de decisão na comunicação",
    "Presença mais consciente",
    "Direcionamento para devolutiva",
    "Desenvolvimento de influência ética",
  ];

  const beneficios = [
    "Autoconhecimento comunicacional",
    "Comunicação mais assertiva",
    "Aumento de presença",
    "Melhor conexão interpessoal",
    "Posicionamento profissional",
    "Expansão de influência",
  ];

  const bullets = [
    "Metodologia própria com base em neurociência comportamental.",
    "Avalia padrões de comunicação, presença, influência e conexão.",
    "Identifica o estilo predominante de carisma.",
    "Gera uma leitura inicial para desenvolvimento pessoal e profissional.",
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative overflow-hidden">
      {/* Ambient glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-primary/10 blur-[140px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute top-1/3 left-[-10%] w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <main className="relative max-w-5xl mx-auto px-6 py-16 md:py-24">
        {/* Hero */}
        <section className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border-2 border-primary/60 neon-border mb-8 bg-background/40 backdrop-blur-sm">
            <Brain className="w-10 h-10 text-primary" />
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-4">
            <span className="text-foreground">Decodifique seu carisma.</span>
            <br />
            <span className="text-primary neon-text">Ative sua presença máxima.</span>
          </h1>

          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-3">
            Ciência aplicada à comunicação, presença e influência.
          </p>
          <p className="text-primary/90 text-sm md:text-base font-semibold uppercase tracking-widest">
            MAP360 NeuroComunicacional
          </p>
        </section>

        {/* Authority card */}
        <section className="mb-16">
          <div className="bg-card/60 backdrop-blur-sm border border-primary/30 rounded-2xl p-8 md:p-10 shadow-xl neon-border">
            <p className="text-center text-lg md:text-xl font-bold text-foreground mb-6">
              A ferramenta de mapeamento{" "}
              <span className="text-primary neon-text">neurocomunicacional</span> da Tutor's Tech.
            </p>
            <ul className="space-y-3 max-w-2xl mx-auto">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm md:text-base text-foreground/90">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 3 columns */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <PillarCard icon={<Layers className="w-5 h-5" />} title="A ESSÊNCIA" subtitle="O que o MAP360 decodifica:" items={essencia} />
          <PillarCard icon={<Target className="w-5 h-5" />} title="POR QUE ESTRATÉGICO?" subtitle="Clareza e visão:" items={estrategico} />
          <PillarCard icon={<Sparkles className="w-5 h-5" />} title="BENEFÍCIOS" subtitle="Transformação real:" items={beneficios} />
        </section>

        {/* Call to action banner */}
        <section className="text-center mb-16 border-y border-border py-12">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-2 text-foreground">
            Decodifique seu carisma.
          </h2>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary neon-text">
            Ative sua presença máxima.
          </h2>
        </section>

        {/* Author */}
        <section className="text-center mb-12">
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-3">
            Idealizadora
          </p>
          <p className="text-xl font-bold text-foreground mb-4">Ângela Almeida Borges</p>
          <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground max-w-lg mx-auto">
            <span className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-primary" />
              Especialista em Neurociência, Comunicação e Comportamento
            </span>
            <span className="text-primary/80 font-semibold mt-1">Tutor's Tech</span>
          </div>
        </section>

        {/* CTA button */}
        <section className="max-w-md mx-auto">
          <NeonButton onClick={() => nav("/acesso")}>
            INICIAR ASSESSMENT <ArrowRight className="inline-block ml-2 w-5 h-5" />
          </NeonButton>
        </section>

        <footer className="mt-16 text-center text-xs text-muted-foreground/50">
          &copy; {new Date().getFullYear()} MAP360 - NeuroComunicacional · Tutor's Tech
        </footer>
      </main>
    </div>
  );
}

function PillarCard({
  icon,
  title,
  subtitle,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  items: string[];
}) {
  return (
    <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 hover:border-primary/60 hover:neon-border transition-all duration-300">
      <div className="flex items-center gap-2 mb-1">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-primary/50 text-primary">
          {icon}
        </span>
        <h3 className="text-primary font-extrabold text-sm tracking-widest">{title}</h3>
      </div>
      <p className="text-xs text-muted-foreground mb-4 ml-10">{subtitle}</p>
      <ul className="space-y-2">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-2 text-sm text-foreground/85">
            <span className="text-primary mt-1.5 shrink-0">▸</span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
