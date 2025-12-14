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
  characteristics: string[];
  communicationStyle: string;
  idealEnvironment: string;
  challenges: string;
  developmentTips: string[];
  famousExamples: string[];
  image: string;
}

export interface ProfileScores {
  S: number;
  R: number;
  V: number;
  P: number;
}

export const RESULTS: Record<CharismaType, CharismaResult> = {
  'S': {
    title: "Carisma Sensível-Empático",
    description: "Pessoa que toca, acolhe, envolve e conecta pelo afeto. Você possui uma capacidade natural de criar vínculos profundos e fazer as pessoas se sentirem verdadeiramente compreendidas.",
    strength: "Criar confiança muito rápido.",
    brain: "Eixo Emocional + Relações.",
    characteristics: [
      "Alta sensibilidade emocional",
      "Escuta ativa e genuína",
      "Capacidade de ler o ambiente",
      "Acolhimento natural",
      "Conexão autêntica com pessoas"
    ],
    communicationStyle: "Você se comunica de forma calorosa e acolhedora, priorizando a conexão emocional antes do conteúdo. Usa histórias, exemplos pessoais e demonstra interesse genuíno pelo outro.",
    idealEnvironment: "Ambientes colaborativos, trabalhos em equipe, áreas de cuidado, coaching, recursos humanos, atendimento ao cliente de alto valor.",
    challenges: "Pode absorver demais as emoções alheias e ter dificuldade em estabelecer limites claros ou tomar decisões que desagradem outros.",
    developmentTips: [
      "Pratique estabelecer limites saudáveis",
      "Desenvolva técnicas de autocuidado emocional",
      "Equilibre empatia com assertividade",
      "Aprenda a dizer não com gentileza"
    ],
    famousExamples: ["Oprah Winfrey", "Brené Brown", "Dalai Lama"],
    image: "carisma-sensivel"
  },
  'R': {
    title: "Carisma Neuroracional",
    description: "Clareza é impacto. Você inspira confiança através da sua capacidade de organizar ideias complexas e apresentá-las de forma lógica e estruturada.",
    strength: "Direção, lógica, precisão.",
    brain: "Eixo Cognitivo + Decisional.",
    characteristics: [
      "Pensamento estruturado e analítico",
      "Clareza na comunicação",
      "Capacidade de síntese",
      "Tomada de decisão rápida",
      "Foco em resultados"
    ],
    communicationStyle: "Você se comunica de forma direta, objetiva e estruturada. Prioriza dados, fatos e argumentos lógicos. É excelente em apresentações executivas e negociações baseadas em valor.",
    idealEnvironment: "Ambientes corporativos, consultoria, áreas técnicas, liderança estratégica, gestão de projetos, finanças.",
    challenges: "Pode parecer frio ou distante emocionalmente. Às vezes subestima a importância das emoções nas decisões dos outros.",
    developmentTips: [
      "Desenvolva sua inteligência emocional",
      "Pratique storytelling para humanizar dados",
      "Reserve tempo para small talk",
      "Mostre vulnerabilidade ocasionalmente"
    ],
    famousExamples: ["Elon Musk", "Angela Merkel", "Bill Gates"],
    image: "carisma-racional"
  },
  'V': {
    title: "Carisma Vibrante-Entusiasmado",
    description: "Presença viva, brilho, energia contagiante. Você tem o poder natural de energizar ambientes e inspirar pessoas a agir através do seu entusiasmo autêntico.",
    strength: "Ativar e engajar pessoas.",
    brain: "Eixo Motivacional.",
    characteristics: [
      "Alta energia expressiva",
      "Entusiasmo contagiante",
      "Presença marcante",
      "Capacidade de inspirar ação",
      "Otimismo natural"
    ],
    communicationStyle: "Você se comunica com energia, movimento e paixão. Usa gestos amplos, variações de tom e ritmo. É excelente em motivar equipes, vendas e apresentações públicas.",
    idealEnvironment: "Vendas, marketing, eventos, treinamentos, liderança de equipes, empreendedorismo, entretenimento.",
    challenges: "Pode ser percebido como superficial ou exagerado. Às vezes tem dificuldade em desacelerar ou em ambientes que exigem sobriedade.",
    developmentTips: [
      "Desenvolva momentos de pausa estratégica",
      "Aprenda a modular sua energia conforme contexto",
      "Cultive profundidade em suas mensagens",
      "Pratique escuta ativa"
    ],
    famousExamples: ["Tony Robbins", "Richard Branson", "Will Smith"],
    image: "carisma-vibrante"
  },
  'P': {
    title: "Carisma Sereno-Profundo",
    description: "Impacto silencioso, profundo e marcante. Você transmite segurança e sabedoria através da sua presença calma e observadora, fazendo as pessoas se sentirem seguras.",
    strength: "Presença e profundidade.",
    brain: "Eixo de Estabilidade + Observação.",
    characteristics: [
      "Presença calma e segura",
      "Observação profunda",
      "Pensamento reflexivo",
      "Estabilidade emocional",
      "Sabedoria nas palavras"
    ],
    communicationStyle: "Você se comunica de forma ponderada e profunda. Fala pouco, mas cada palavra tem peso. É excelente em aconselhamento, mentoria e situações que exigem calma.",
    idealEnvironment: "Mentoria, consultoria estratégica, liderança em crises, pesquisa, desenvolvimento, áreas que exigem reflexão profunda.",
    challenges: "Pode ser visto como distante ou passivo. Às vezes demora para se posicionar ou pode parecer lento em ambientes de alta velocidade.",
    developmentTips: [
      "Pratique se posicionar mais rapidamente",
      "Aumente sua expressividade quando necessário",
      "Compartilhe mais suas ideias proativamente",
      "Desenvolva networking ativo"
    ],
    famousExamples: ["Keanu Reeves", "Barack Obama", "Morgan Freeman"],
    image: "carisma-sereno"
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
