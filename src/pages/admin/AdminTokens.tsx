import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { NeonButton } from "@/components/NeonButton";
import { Copy, X, RefreshCw, Loader2, Download } from "lucide-react";
import { toast } from "sonner";
import { exportToCSV } from "@/lib/exportCsv";

function genToken() {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 10; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

export default function AdminTokens() {
  const [tokens, setTokens] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "active" | "used" | "expired" | "revoked">("all");
  const [batchQty, setBatchQty] = useState(1);
  const [validityHours, setValidityHours] = useState(24);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("access_tokens")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);
    setTokens(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const createTokens = async () => {
    const rows = Array.from({ length: batchQty }, () => ({
      token: genToken(),
      expires_at: new Date(Date.now() + validityHours * 3600 * 1000).toISOString(),
    }));
    const { error } = await supabase.from("access_tokens").insert(rows);
    if (error) return toast.error(error.message);
    toast.success(`${batchQty} token(s) gerado(s).`);
    load();
  };

  const revoke = async (id: string) => {
    const { error } = await supabase
      .from("access_tokens")
      .update({ status: "revoked", revoked_at: new Date().toISOString() })
      .eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Token revogado.");
    load();
  };

  const regenerate = async () => {
    const { error } = await supabase.from("access_tokens").insert({
      token: genToken(),
      expires_at: new Date(Date.now() + validityHours * 3600 * 1000).toISOString(),
    });
    if (error) return toast.error(error.message);
    toast.success("Novo token gerado.");
    load();
  };

  const copy = (t: string) => {
    navigator.clipboard.writeText(t);
    toast.success("Token copiado.");
  };

  const filtered = filter === "all" ? tokens : tokens.filter((t) => t.status === filter);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Tokens de Acesso</h1>

      <div className="bg-card border border-border rounded-xl p-6 mb-6">
        <h2 className="text-lg font-bold mb-4">Gerar Tokens</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-xs uppercase text-primary mb-1">Quantidade</label>
            <input type="number" min={1} max={100} value={batchQty} onChange={(e) => setBatchQty(+e.target.value)}
              className="w-full bg-background border border-border rounded-lg p-2" />
          </div>
          <div>
            <label className="block text-xs uppercase text-primary mb-1">Validade (horas)</label>
            <input type="number" min={1} value={validityHours} onChange={(e) => setValidityHours(+e.target.value)}
              className="w-full bg-background border border-border rounded-lg p-2" />
          </div>
          <div className="md:col-span-2">
            <NeonButton onClick={createTokens}>Gerar {batchQty > 1 ? `${batchQty} Tokens` : "Token"}</NeonButton>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex gap-2 flex-wrap">
            {(["all", "active", "used", "expired", "revoked"] as const).map((s) => (
              <button key={s} onClick={() => setFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs uppercase font-semibold transition-colors ${
                  filter === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
                }`}>
                {s === "all" ? "Todos" : s}
              </button>
            ))}
          </div>
          <button onClick={() => exportToCSV(
            filtered.map((t) => ({
              token: t.token, status: t.status,
              created_at: t.created_at, expires_at: t.expires_at,
              used_at: t.used_at || "", revoked_at: t.revoked_at || "",
              ip: t.ip_address || "", browser: t.browser || "", device: t.device || "",
            })), `tokens_${Date.now()}.csv`,
          )} className="flex items-center gap-2 text-xs text-primary hover:underline">
            <Download size={14} /> Exportar CSV
          </button>
        </div>

        {loading ? (
          <div className="text-center py-8"><Loader2 className="animate-spin inline text-primary" /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs uppercase text-muted-foreground border-b border-border">
                <tr>
                  <th className="text-left py-2 px-2">Token</th>
                  <th className="text-left py-2 px-2">Status</th>
                  <th className="text-left py-2 px-2">Criado</th>
                  <th className="text-left py-2 px-2">Expira</th>
                  <th className="text-left py-2 px-2">IP</th>
                  <th className="text-right py-2 px-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((t) => (
                  <tr key={t.id} className="border-b border-border/50 hover:bg-muted/30">
                    <td className="py-2 px-2 font-mono">{t.token}</td>
                    <td className="py-2 px-2">
                      <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                        t.status === "active" ? "bg-green-500/20 text-green-400" :
                        t.status === "used" ? "bg-blue-500/20 text-blue-400" :
                        t.status === "expired" ? "bg-yellow-500/20 text-yellow-400" :
                        "bg-red-500/20 text-red-400"
                      }`}>{t.status}</span>
                    </td>
                    <td className="py-2 px-2 text-xs text-muted-foreground">{new Date(t.created_at).toLocaleString("pt-BR")}</td>
                    <td className="py-2 px-2 text-xs text-muted-foreground">{new Date(t.expires_at).toLocaleString("pt-BR")}</td>
                    <td className="py-2 px-2 text-xs text-muted-foreground">{t.ip_address || "-"}</td>
                    <td className="py-2 px-2 text-right">
                      <button onClick={() => copy(t.token)} title="Copiar" className="p-1 text-primary hover:text-primary/70"><Copy size={14} /></button>
                      {t.status === "active" && (
                        <button onClick={() => revoke(t.id)} title="Revogar" className="p-1 text-red-400 hover:text-red-300 ml-1"><X size={14} /></button>
                      )}
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={6} className="text-center py-8 text-muted-foreground">Nenhum token encontrado.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
