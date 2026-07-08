import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { KeyRound, Users, FileText, CheckCircle2 } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    tokensActive: 0,
    tokensUsed: 0,
    totalLeads: 0,
    totalResults: 0,
    byProfile: { S: 0, R: 0, V: 0, P: 0 } as Record<string, number>,
  });

  useEffect(() => {
    (async () => {
      const [{ count: active }, { count: used }, { count: leads }, { data: results }] = await Promise.all([
        supabase.from("access_tokens").select("*", { count: "exact", head: true }).eq("status", "active"),
        supabase.from("access_tokens").select("*", { count: "exact", head: true }).eq("status", "used"),
        supabase.from("participants").select("*", { count: "exact", head: true }),
        supabase.from("test_results").select("dominant_profile"),
      ]);
      const byProfile = { S: 0, R: 0, V: 0, P: 0 } as Record<string, number>;
      (results ?? []).forEach((r: any) => {
        if (byProfile[r.dominant_profile] !== undefined) byProfile[r.dominant_profile]++;
      });
      setStats({
        tokensActive: active ?? 0,
        tokensUsed: used ?? 0,
        totalLeads: leads ?? 0,
        totalResults: results?.length ?? 0,
        byProfile,
      });
    })();
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card icon={<KeyRound />} label="Tokens Ativos" value={stats.tokensActive} />
        <Card icon={<CheckCircle2 />} label="Tokens Usados" value={stats.tokensUsed} />
        <Card icon={<Users />} label="Total de Leads" value={stats.totalLeads} />
        <Card icon={<FileText />} label="Resultados" value={stats.totalResults} />
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="text-lg font-bold mb-4">Distribuição por Perfil</h2>
        <div className="grid grid-cols-4 gap-4">
          {(["S","R","V","P"] as const).map((k) => (
            <div key={k} className="bg-muted p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-primary">{stats.byProfile[k]}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {k === "S" ? "Sensível" : k === "R" ? "Racional" : k === "V" ? "Vibrante" : "Sereno"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}

function Card({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-2">
        <span className="text-primary">{icon}</span>
      </div>
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-xs text-muted-foreground mt-1">{label}</div>
    </div>
  );
}
