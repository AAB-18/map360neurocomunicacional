import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { NeonButton } from "@/components/NeonButton";
import { toast } from "sonner";
import tutorsTechLogo from "@/assets/tutors-tech-logo.jpeg";

export default function AdminLogin() {
  const nav = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast.success("Conta criada. Você já pode entrar.");
        setMode("login");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Bem-vindo!");
        nav("/admin");
      }
    } catch (err: any) {
      toast.error(err?.message || "Erro na autenticação.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <img src={tutorsTechLogo} alt="Logo" className="w-16 h-16 mx-auto mb-3 object-contain" />
          <h1 className="text-lg font-bold text-foreground">Painel Administrativo</h1>
          <p className="text-primary neon-text text-sm">MAP360</p>
        </div>
        <form onSubmit={submit} className="bg-card border border-border rounded-xl p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-primary uppercase mb-1">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-background border border-border rounded-lg p-3 text-foreground focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-primary uppercase mb-1">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full bg-background border border-border rounded-lg p-3 text-foreground focus:border-primary focus:outline-none"
            />
          </div>
          <NeonButton disabled={loading} type="submit">
            {loading ? <Loader2 className="w-4 h-4 animate-spin inline" /> : mode === "login" ? "Entrar" : "Criar conta"}
          </NeonButton>
          <button
            type="button"
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="w-full text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            {mode === "login" ? "Primeira vez? Criar conta" : "Já tenho conta"}
          </button>
          <p className="text-[10px] text-center text-muted-foreground/60">
            O primeiro cadastro recebe automaticamente permissão de administrador.
          </p>
        </form>
      </div>
    </div>
  );
}
