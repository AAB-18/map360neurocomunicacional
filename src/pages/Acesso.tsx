import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, ChevronRight, KeyRound, Loader2 } from "lucide-react";
import { PublicLayout } from "@/components/PublicLayout";
import { NeonButton } from "@/components/NeonButton";
import { supabase } from "@/integrations/supabase/client";
import { saveParticipantSession } from "@/lib/participantSession";
import { toast } from "sonner";
import tutorsTechLogo from "@/assets/tutors-tech-logo.jpeg";

export default function Acesso() {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    token: "",
    name: "",
    email: "",
    whatsapp: "",
    profession: "",
    education: "",
    company: "",
    role_position: "",
    city: "",
    state: "",
    referral: "",
    lgpd: false,
  });

  const set = (k: string, v: string | boolean) => setForm((p) => ({ ...p, [k]: v }));

  const valid =
    form.token && form.name && form.email && form.whatsapp && form.profession && form.education && form.lgpd;

  const submit = async () => {
    if (!valid) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("register-participant", {
        body: form,
      });
      if (error) throw error;
      if ((data as any)?.error) {
        toast.error((data as any).error);
        setLoading(false);
        return;
      }
      const participantId = (data as any).participantId;
      saveParticipantSession({
        participantId,
        name: form.name,
        email: form.email,
        whatsapp: form.whatsapp,
        profession: form.profession,
        education: form.education,
      });
      nav("/teste");
    } catch (e: any) {
      toast.error(e?.message || "Erro ao validar acesso.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicLayout>
      <div className="text-center mb-6">
        <img src={tutorsTechLogo} alt="Logo" className="w-16 h-16 mx-auto mb-3 object-contain" />
        <h1 className="text-lg font-extrabold text-foreground">Acesso ao Teste</h1>
        <p className="text-primary neon-text text-sm mt-1">MAP360 - NeuroComunicacional</p>
      </div>

      <div className="bg-card/50 p-6 rounded-xl border border-border shadow-xl backdrop-blur-sm space-y-4">
        <div>
          <label className="block text-xs font-semibold text-primary uppercase mb-1">
            <KeyRound size={12} className="inline mr-1" /> Token de Acesso *
          </label>
          <input
            type="text"
            value={form.token}
            onChange={(e) => set("token", e.target.value)}
            className="w-full bg-background border-2 border-primary/40 rounded-lg p-3 text-foreground focus:border-primary focus:outline-none font-mono uppercase tracking-wider"
            placeholder="Digite seu token"
          />
        </div>

        <div className="border-t border-border pt-4 space-y-4">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Identificação</p>
          <Input label="Nome Completo *" value={form.name} onChange={(v) => set("name", v)} />
          <Input label="E-mail *" type="email" value={form.email} onChange={(v) => set("email", v)} />
          <Input label="WhatsApp *" type="tel" value={form.whatsapp} onChange={(v) => set("whatsapp", v)} placeholder="(XX) XXXXX-XXXX" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Profissão *" value={form.profession} onChange={(v) => set("profession", v)} />
            <div>
              <label className="block text-xs font-semibold text-primary uppercase mb-1">Escolaridade *</label>
              <select
                value={form.education}
                onChange={(e) => set("education", e.target.value)}
                className="w-full bg-background border border-border rounded-lg p-3 text-foreground focus:border-primary focus:outline-none"
              >
                <option value="">Selecione...</option>
                <option value="Médio">Ensino Médio</option>
                <option value="Superior">Ensino Superior</option>
                <option value="Pós">Pós-Graduação/MBA</option>
                <option value="Mestrado/Doutorado">Mestrado/Doutorado</option>
              </select>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-4 space-y-4">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Dados adicionais (opcional)</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Empresa" value={form.company} onChange={(v) => set("company", v)} />
            <Input label="Cargo" value={form.role_position} onChange={(v) => set("role_position", v)} />
            <Input label="Cidade" value={form.city} onChange={(v) => set("city", v)} />
            <Input label="Estado" value={form.state} onChange={(v) => set("state", v)} />
          </div>
          <Input label="Como conheceu a Tutor's Tech?" value={form.referral} onChange={(v) => set("referral", v)} />
        </div>

        <div className="flex items-start space-x-3 pt-2 border-t border-border">
          <input
            type="checkbox"
            id="lgpd"
            checked={form.lgpd}
            onChange={(e) => set("lgpd", e.target.checked)}
            className="mt-1 w-5 h-5 accent-primary cursor-pointer"
          />
          <label htmlFor="lgpd" className="text-sm text-muted-foreground cursor-pointer select-none">
            <span className="flex items-center gap-2 mb-1">
              <Lock size={14} /> LGPD:
            </span>
            Declaro que as informações são verdadeiras e concordo com o processamento dos meus dados para geração do resultado.
          </label>
        </div>
      </div>

      <div className="mt-6">
        <NeonButton onClick={submit} disabled={!valid || loading}>
          {loading ? (
            <><Loader2 className="inline-block animate-spin w-5 h-5 mr-2" /> Validando...</>
          ) : (
            <>Iniciar Teste <ChevronRight className="inline-block ml-2 w-5 h-5" /></>
          )}
        </NeonButton>
      </div>
    </PublicLayout>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-primary uppercase mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-background border border-border rounded-lg p-3 text-foreground focus:border-primary focus:outline-none"
      />
    </div>
  );
}
