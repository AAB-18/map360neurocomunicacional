export const CHARISMA_STYLES = [
  {
    id: 1,
    title: "Carisma Neuroracional",
    desc: "Impacto pela clareza, lógica e direção.",
    axis: "T7: Eixo da Tomada de Decisão + Cognitivo."
  },
  {
    id: 2,
    title: "Carisma Sensível-Empático",
    desc: "Impacto pelo acolhimento, calor humano e escuta.",
    axis: "T7: Eixo Emocional + Relações."
  },
  {
    id: 3,
    title: "Carisma Vibrante-Entusiasmado",
    desc: "Energia, movimento, presença expansiva.",
    axis: "T7: Eixo Motivacional + Temperamento."
  },
  {
    id: 4,
    title: "Carisma Sereno-Seguro",
    desc: "Tranquilidade, firmeza, constância.",
    axis: "T7: Estabilidade + Reações Cerebrais."
  },
  {
    id: 5,
    title: "Carisma Estratégico-Influente",
    desc: "Joga para ganhar, pensa no impacto, cria visão.",
    axis: "T7: Eixo Estratégico + Decisões rápidas."
  },
  {
    id: 6,
    title: "Carisma Silencioso-Profundo",
    desc: "Impacto pela quietude, profundidade e presença.",
    axis: "T7: Observação + Processamento interno."
  }
];

export type CharismaType = 'S' | 'R' | 'V' | 'P';

export const QUESTIONS = [
  {
    id: 1,
    text: "Quando você entra em uma sala…",
    options: [
      { text: "A. Já chega com energia, sorriso, puxando conversa.", type: 'V' as CharismaType },
      { text: "B. Observa, sente o ambiente e vai aos poucos.", type: 'P' as CharismaType },
      { text: "C. Vai direto ao ponto, cumprimenta e indica o rumo.", type: 'R' as CharismaType },
      { text: "D. Transmite calma e confiança sem muito falar.", type: 'P' as CharismaType }
    ]
  },
  {
    id: 2,
    text: "Na comunicação do dia a dia, você se considera…",
    options: [
      { text: "A. Caloroso(a) e acolhedor(a).", type: 'S' as CharismaType },
      { text: "B. Claro(a), direto(a) e objetivo(a).", type: 'R' as CharismaType },
      { text: "C. Engajado(a) e entusiasmado(a).", type: 'V' as CharismaType },
      { text: "D. Reservado(a), mas profundo(a).", type: 'P' as CharismaType }
    ]
  },
  {
    id: 3,
    text: "Quando precisa convencer alguém…",
    options: [
      { text: "A. Usa dados, lógica e argumentos sólidos.", type: 'R' as CharismaType },
      { text: "B. Conecta emocionalmente e escuta muito.", type: 'S' as CharismaType },
      { text: "C. Usa energia e entusiasmo.", type: 'V' as CharismaType },
      { text: "D. Usa calma, presença e confiança.", type: 'P' as CharismaType }
    ]
  },
  {
    id: 4,
    text: "Seu ponto forte ao se comunicar é…",
    options: [
      { text: "A. Criar conexão humana.", type: 'S' as CharismaType },
      { text: "B. Passar clareza e direção.", type: 'R' as CharismaType },
      { text: "C. Inspirar e motivar.", type: 'V' as CharismaType },
      { text: "D. Observar e fazer análises profundas.", type: 'P' as CharismaType }
    ]
  },
  {
    id: 5,
    text: "Quando está falando em público…",
    options: [
      { text: "A. Brilha, movimenta e envolve a sala.", type: 'V' as CharismaType },
      { text: "B. Mantém serenidade e fala com segurança.", type: 'P' as CharismaType },
      { text: "C. Encanta pela escuta e empatia.", type: 'S' as CharismaType },
      { text: "D. Impressiona com raciocínio e estrutura.", type: 'R' as CharismaType }
    ]
  },
  {
    id: 6,
    text: "Em conflitos, sua tendência é…",
    options: [
      { text: "A. Entender o lado do outro primeiro.", type: 'S' as CharismaType },
      { text: "B. Resolver rápido e direto.", type: 'R' as CharismaType },
      { text: "C. Trazer calma e ordem.", type: 'P' as CharismaType },
      { text: "D. Recuar, pensar e só depois agir.", type: 'R' as CharismaType }
    ]
  },
  {
    id: 7,
    text: "O que mais impacta as pessoas em você?",
    options: [
      { text: "A. Sua energia.", type: 'V' as CharismaType },
      { text: "B. Sua empatia.", type: 'S' as CharismaType },
      { text: "C. Sua calma.", type: 'P' as CharismaType },
      { text: "D. Sua clareza.", type: 'R' as CharismaType }
    ]
  },
  {
    id: 8,
    text: "Ao falar sobre suas ideias…",
    options: [
      { text: "A. Fala animado(a), gesticulando.", type: 'V' as CharismaType },
      { text: "B. Explica passo a passo.", type: 'R' as CharismaType },
      { text: "C. Fala pouco, mas com profundidade.", type: 'P' as CharismaType },
      { text: "D. Envolve com sensibilidade.", type: 'S' as CharismaType }
    ]
  },
  {
    id: 9,
    text: "Em reuniões…",
    options: [
      { text: "A. Gosta de liderar pela visão.", type: 'V' as CharismaType },
      { text: "B. Organiza, estrutura e define.", type: 'R' as CharismaType },
      { text: "C. Traz harmonia.", type: 'S' as CharismaType },
      { text: "D. Observa primeiro, fala depois.", type: 'P' as CharismaType }
    ]
  },
  {
    id: 10,
    text: "Pessoas normalmente dizem que você é…",
    options: [
      { text: "A. Inspirador(a).", type: 'V' as CharismaType },
      { text: "B. Confiável.", type: 'P' as CharismaType },
      { text: "C. Inteligente.", type: 'R' as CharismaType },
      { text: "D. Acolhedor(a).", type: 'S' as CharismaType }
    ]
  },
  {
    id: 11,
    text: "Sua energia social é…",
    options: [
      { text: "A. Alta, expansiva.", type: 'V' as CharismaType },
      { text: "B. Média, estável.", type: 'P' as CharismaType },
      { text: "C. Alta, mas focada.", type: 'R' as CharismaType },
      { text: "D. Baixa e profunda.", type: 'S' as CharismaType }
    ]
  },
  {
    id: 12,
    text: "Quando você quer causar impacto…",
    options: [
      { text: "A. Usa histórias e emoção.", type: 'S' as CharismaType },
      { text: "B. Usa lógica e clareza.", type: 'R' as CharismaType },
      { text: "C. Usa energia e movimento.", type: 'V' as CharismaType },
      { text: "D. Usa presença e profundidade.", type: 'P' as CharismaType }
    ]
  }
];

export interface CharismaResult {
  title: string;
  description: string;
  strength: string;
  brain: string;
}

export const RESULTS: Record<CharismaType, CharismaResult> = {
  'S': {
    title: "Carisma Sensível-Empático",
    description: "Pessoa que toca, acolhe, envolve e conecta pelo afeto.",
    strength: "Criar confiança muito rápido.",
    brain: "Eixo Emocional + Relações."
  },
  'R': {
    title: "Carisma Neuroracional",
    description: "Clareza é impacto.",
    strength: "Direção, lógica, precisão.",
    brain: "Eixo Cognitivo + Decisional."
  },
  'V': {
    title: "Carisma Vibrante-Entusiasmado",
    description: "Presença viva, brilho, energia contagiante.",
    strength: "Ativar e engajar pessoas.",
    brain: "Eixo Motivacional."
  },
  'P': {
    title: "Carisma Sereno-Profundo",
    description: "Impacto silencioso, profundo e marcante.",
    strength: "Presença.",
    brain: "Eixo de Estabilidade + Observação."
  }
};

export interface FormData {
  name: string;
  email: string;
  whatsapp: string;
  profession: string;
  education: string;
  lgpd: boolean;
}
