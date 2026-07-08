import { useEffect, useMemo, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Download, FileText, Loader2, Search } from "lucide-react";
import { exportToCSV } from "@/lib/exportCsv";
import { generateReportPDF } from "@/lib/generatePdfReport";
import { toast } from "sonner";

export default function AdminResultados() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("test_results")
        .select("*, participants(*, access_tokens(token, ip_address, browser, device, user_agent))")
        .order("completed_at", { ascending: false })
        .limit(500);
      setRows(data ?? []);
      setLoading(false);
    })();
  }, []);

  const filtered = useMemo(() => {
    if (!q.trim()) return rows;
    const s = q.toLowerCase();
    return rows.filter((r) =>
      [r.participants?.name, r.participants?.email, r.dominant_profile]
        .some((v) => String(v ?? "").toLowerCase().includes(s))
    );
  }, [q, rows]);

  const downloadPdf = (r: any) => {
    try {
      generateReportPDF({
        participant: r.participants,
        result: r,
      });
    } catch (e: any) {
      toast.error("Erro ao gerar PDF: " + e.message);
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Resultados</h1>
        <button onClick={() => exportToCSV(
          filtered.map((r) => ({
            nome: r.participants?.name,
            email: r.participants?.email,
            whatsapp: r.participants?.whatsapp,
            profissao: r.participants?.profession,
            perfil: r.dominant_profile,
            score_s: r.score_s, score_r: r.score_r, score_v: r.score_v, score_p: r.score_p,
            data: r.completed_at,
            ip: r.participants?.access_tokens?.ip_address || "",
            navegador: r.participants?.access_tokens?.browser || "",
            dispositivo: r.participants?.access_tokens?.device || "",
          })), `resultados_${Date.now()}.csv`,
        )} className="flex items-center gap-2 text-sm text-primary hover:underline">
          <Download size={16} /> Exportar CSV
        </button>
      </div>

      <div className="mb-4 relative">
        <Search className="absolute left-3 top-3 text-muted-foreground" size={16} />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar por nome, email ou perfil..."
          className="w-full bg-card border border-border rounded-lg pl-10 p-3 text-sm focus:border-primary focus:outline-none" />
      </div>

      <div className="bg-card border border-border rounded-xl p-4">
        {loading ? (
          <div className="text-center py-8"><Loader2 className="animate-spin inline text-primary" /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs uppercase text-muted-foreground border-b border-border">
                <tr>
                  <th className="text-left py-2 px-2">Nome</th>
                  <th className="text-left py-2 px-2">Perfil</th>
                  <th className="text-center py-2 px-2">S</th>
                  <th className="text-center py-2 px-2">R</th>
                  <th className="text-center py-2 px-2">V</th>
                  <th className="text-center py-2 px-2">P</th>
                  <th className="text-left py-2 px-2">Data</th>
                  <th className="text-left py-2 px-2">Auditoria</th>
                  <th className="text-right py-2 px-2">PDF</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id} className="border-b border-border/50 hover:bg-muted/30">
                    <td className="py-2 px-2">
                      <div className="font-medium">{r.participants?.name}</div>
                      <div className="text-xs text-muted-foreground">{r.participants?.email}</div>
                    </td>
                    <td className="py-2 px-2">
                      <span className="text-xs px-2 py-1 rounded-full font-semibold bg-primary/20 text-primary">
                        {r.dominant_profile}
                      </span>
                    </td>
                    <td className="text-center">{r.score_s}</td>
                    <td className="text-center">{r.score_r}</td>
                    <td className="text-center">{r.score_v}</td>
                    <td className="text-center">{r.score_p}</td>
                    <td className="py-2 px-2 text-xs text-muted-foreground">{new Date(r.completed_at).toLocaleString("pt-BR")}</td>
                    <td className="py-2 px-2 text-[10px] text-muted-foreground">
                      {r.participants?.access_tokens?.ip_address || "-"}<br />
                      {r.participants?.access_tokens?.browser || ""} · {r.participants?.access_tokens?.device || ""}
                    </td>
                    <td className="py-2 px-2 text-right">
                      <button onClick={() => downloadPdf(r)}
                        className="inline-flex items-center gap-1 text-primary hover:underline text-xs">
                        <FileText size={14} /> Baixar
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={9} className="text-center py-8 text-muted-foreground">Nenhum resultado.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
