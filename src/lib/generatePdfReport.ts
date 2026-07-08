import { jsPDF } from "jspdf";
import { RESULTS, CharismaType } from "@/data/charismaData";

interface PdfData {
  participant: {
    name: string;
    email: string;
    whatsapp: string;
    profession: string;
    education: string;
    company?: string | null;
    city?: string | null;
    state?: string | null;
  };
  result: {
    dominant_profile: string;
    score_s: number;
    score_r: number;
    score_v: number;
    score_p: number;
    completed_at: string;
  };
}

export function generateReportPDF({ participant, result }: PdfData) {
  const doc = new jsPDF();
  const pageW = doc.internal.pageSize.getWidth();
  const margin = 15;
  let y = 20;

  const profile = RESULTS[result.dominant_profile as CharismaType];

  // Header
  doc.setFillColor(255, 0, 51);
  doc.rect(0, 0, pageW, 12, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("MAP360 - NeuroComunicacional | Tutor's Tech", margin, 8);

  y = 25;
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("Relatório Neurocomunicacional", margin, y);
  y += 6;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100);
  doc.text(
    `Realizado em: ${new Date(result.completed_at).toLocaleString("pt-BR")}`,
    margin,
    y
  );

  // Participant
  y += 10;
  doc.setTextColor(255, 0, 51);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("DADOS DO PARTICIPANTE", margin, y);
  y += 2;
  doc.setDrawColor(255, 0, 51);
  doc.line(margin, y, pageW - margin, y);
  y += 6;
  doc.setTextColor(0);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const info = [
    ["Nome", participant.name],
    ["E-mail", participant.email],
    ["WhatsApp", participant.whatsapp],
    ["Profissão", participant.profession],
    ["Escolaridade", participant.education],
  ];
  if (participant.company) info.push(["Empresa", participant.company]);
  if (participant.city) info.push(["Cidade", `${participant.city}${participant.state ? "/" + participant.state : ""}`]);
  info.forEach(([k, v]) => {
    doc.setFont("helvetica", "bold");
    doc.text(`${k}:`, margin, y);
    doc.setFont("helvetica", "normal");
    doc.text(String(v), margin + 30, y);
    y += 5;
  });

  // Result
  y += 6;
  doc.setTextColor(255, 0, 51);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("PERFIL PREDOMINANTE", margin, y);
  y += 2;
  doc.line(margin, y, pageW - margin, y);
  y += 7;
  doc.setTextColor(0);
  doc.setFontSize(14);
  doc.text(profile.title, margin, y);
  y += 7;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const descLines = doc.splitTextToSize(profile.description, pageW - 2 * margin);
  doc.text(descLines, margin, y);
  y += descLines.length * 5 + 4;

  // Scores
  doc.setFont("helvetica", "bold");
  doc.text("Pontuação por dimensão:", margin, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  const scores = [
    ["Sensível-Empático (S)", result.score_s],
    ["Neuroracional (R)", result.score_r],
    ["Vibrante-Entusiasmado (V)", result.score_v],
    ["Sereno-Profundo (P)", result.score_p],
  ];
  scores.forEach(([label, val]) => {
    doc.text(`• ${label}: ${val} pontos`, margin + 3, y);
    y += 5;
  });

  // Strengths
  y += 4;
  doc.setTextColor(255, 0, 51);
  doc.setFont("helvetica", "bold");
  doc.text("PONTOS FORTES", margin, y);
  y += 2;
  doc.line(margin, y, pageW - margin, y);
  y += 6;
  doc.setTextColor(0);
  doc.setFont("helvetica", "normal");
  profile.characteristics.forEach((c) => {
    const lines = doc.splitTextToSize(`• ${c}`, pageW - 2 * margin);
    doc.text(lines, margin, y);
    y += lines.length * 5;
  });

  // Communication style
  y += 4;
  doc.setTextColor(255, 0, 51);
  doc.setFont("helvetica", "bold");
  doc.text("ESTILO DE COMUNICAÇÃO", margin, y);
  y += 2;
  doc.line(margin, y, pageW - margin, y);
  y += 6;
  doc.setTextColor(0);
  doc.setFont("helvetica", "normal");
  const commLines = doc.splitTextToSize(profile.communicationStyle, pageW - 2 * margin);
  doc.text(commLines, margin, y);
  y += commLines.length * 5;

  // New page if needed
  if (y > 240) {
    doc.addPage();
    y = 20;
  } else {
    y += 4;
  }

  // Attention
  doc.setTextColor(255, 0, 51);
  doc.setFont("helvetica", "bold");
  doc.text("PONTOS DE ATENÇÃO", margin, y);
  y += 2;
  doc.line(margin, y, pageW - margin, y);
  y += 6;
  doc.setTextColor(0);
  doc.setFont("helvetica", "normal");
  const chLines = doc.splitTextToSize(profile.challenges, pageW - 2 * margin);
  doc.text(chLines, margin, y);
  y += chLines.length * 5 + 4;

  // Recommendations
  doc.setTextColor(255, 0, 51);
  doc.setFont("helvetica", "bold");
  doc.text("RECOMENDAÇÕES DE DESENVOLVIMENTO", margin, y);
  y += 2;
  doc.line(margin, y, pageW - margin, y);
  y += 6;
  doc.setTextColor(0);
  doc.setFont("helvetica", "normal");
  profile.developmentTips.forEach((t) => {
    const lines = doc.splitTextToSize(`• ${t}`, pageW - 2 * margin);
    doc.text(lines, margin, y);
    y += lines.length * 5;
  });

  y += 4;
  doc.setTextColor(255, 0, 51);
  doc.setFont("helvetica", "bold");
  doc.text("AMBIENTE IDEAL", margin, y);
  y += 2;
  doc.line(margin, y, pageW - margin, y);
  y += 6;
  doc.setTextColor(0);
  doc.setFont("helvetica", "normal");
  const envLines = doc.splitTextToSize(profile.idealEnvironment, pageW - 2 * margin);
  doc.text(envLines, margin, y);
  y += envLines.length * 5 + 4;

  // Devolutiva
  if (y > 230) { doc.addPage(); y = 20; }
  doc.setTextColor(255, 0, 51);
  doc.setFont("helvetica", "bold");
  doc.text("ORIENTAÇÃO PARA DEVOLUTIVA", margin, y);
  y += 2;
  doc.line(margin, y, pageW - margin, y);
  y += 6;
  doc.setTextColor(0);
  doc.setFont("helvetica", "normal");
  const devText = `Utilize este relatório como ponto de partida para uma conversa reflexiva sobre presença, comunicação e impacto. Explore com o participante como o perfil ${profile.title} se manifesta em seu cotidiano profissional e pessoal, valorizando os pontos fortes e criando um plano de desenvolvimento a partir dos pontos de atenção.`;
  const devLines = doc.splitTextToSize(devText, pageW - 2 * margin);
  doc.text(devLines, margin, y);
  y += devLines.length * 5 + 4;

  // Ethics
  doc.setTextColor(255, 0, 51);
  doc.setFont("helvetica", "bold");
  doc.text("OBSERVAÇÃO ÉTICA", margin, y);
  y += 2;
  doc.line(margin, y, pageW - margin, y);
  y += 6;
  doc.setTextColor(0);
  doc.setFont("helvetica", "normal");
  const ethicsText = "Este mapeamento tem caráter reflexivo e educacional. Não substitui avaliações clínicas, psicológicas ou psiquiátricas. Recomenda-se sua utilização em contextos de desenvolvimento pessoal, profissional e de comunicação.";
  const ethicsLines = doc.splitTextToSize(ethicsText, pageW - 2 * margin);
  doc.text(ethicsLines, margin, y);

  // Footer on every page
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    const pageH = doc.internal.pageSize.getHeight();
    doc.setDrawColor(255, 0, 51);
    doc.line(margin, pageH - 18, pageW - margin, pageH - 18);
    doc.setFontSize(7);
    doc.setTextColor(120);
    doc.setFont("helvetica", "italic");
    const footer = "Este relatório não possui finalidade clínica, psicológica ou diagnóstica. Trata-se de uma leitura neurocomunicacional para fins de desenvolvimento pessoal e profissional.";
    const fLines = doc.splitTextToSize(footer, pageW - 2 * margin);
    doc.text(fLines, margin, pageH - 14);
    doc.setFont("helvetica", "normal");
    doc.text(`Página ${i} de ${pageCount}`, pageW - margin, pageH - 5, { align: "right" });
    doc.text("MAP360 - Tutor's Tech", margin, pageH - 5);
  }

  doc.save(`Relatorio_${participant.name.replace(/\s+/g, "_")}.pdf`);
}
