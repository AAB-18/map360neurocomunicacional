import { useEffect, useMemo, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Download, Loader2, Search } from "lucide-react";
import { exportToCSV } from "@/lib/exportCsv";

export default function AdminLeads() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("participants")
        .select("*, access_tokens(token)")
        .order("created_at", { ascending: false })
        .limit(1000);
      setLeads(data ?? []);
      setLoading(false);
    })();
  }, []);

  const filtered = useMemo(() => {
    if (!q.trim()) return leads;
    const s = q.toLowerCase();
    return leads.filter((l) =>
      [l.name, l.email, l.whatsapp, l.profession, l.company, l.access_tokens?.token]
        .some((v) => String(v ?? "").toLowerCase().includes(s))
    );
  }, [q, leads]);

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Leads</h1>
        <button onClick={() => exportToCSV(
          filtered.map((l) => ({
            nome: l.name, email: l.email, whatsapp: l.whatsapp,
            profissao: l.profession, escolaridade: l.education,
            empresa: l.company || "", cargo: l.role_position || "",
            cidade: l.city || "", estado: l.state || "",
            origem: l.referral || "",
            token: l.access_tokens?.token || "",
            data: l.created_at,
          })), `leads_${Date.now()}.csv`,
        )} className="flex items-center gap-2 text-sm text-primary hover:underline">
          <Download size={16} /> Exportar CSV
        </button>
      </div>

      <div className="mb-4 relative">
        <Search className="absolute left-3 top-3 text-muted-foreground" size={16} />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar por nome, email, whatsapp, profissão, empresa ou token..."
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
                  <th className="text-left py-2 px-2">Email</th>
                  <th className="text-left py-2 px-2">WhatsApp</th>
                  <th className="text-left py-2 px-2">Profissão</th>
                  <th className="text-left py-2 px-2">Empresa</th>
                  <th className="text-left py-2 px-2">Token</th>
                  <th className="text-left py-2 px-2">Data</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((l) => (
                  <tr key={l.id} className="border-b border-border/50 hover:bg-muted/30">
                    <td className="py-2 px-2 font-medium">{l.name}</td>
                    <td className="py-2 px-2 text-xs">{l.email}</td>
                    <td className="py-2 px-2 text-xs">{l.whatsapp}</td>
                    <td className="py-2 px-2 text-xs">{l.profession}</td>
                    <td className="py-2 px-2 text-xs">{l.company || "-"}</td>
                    <td className="py-2 px-2 text-xs font-mono">{l.access_tokens?.token || "-"}</td>
                    <td className="py-2 px-2 text-xs text-muted-foreground">{new Date(l.created_at).toLocaleDateString("pt-BR")}</td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={7} className="text-center py-8 text-muted-foreground">Nenhum lead encontrado.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
