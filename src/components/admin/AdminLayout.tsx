import { ReactNode } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LogOut, LayoutDashboard, KeyRound, Users, FileText, Loader2 } from "lucide-react";
import { useAdminAuth } from "@/hooks/useAdminAuth";

export function AdminLayout({ children }: { children: ReactNode }) {
  const { user, isAdmin, loading, signOut } = useAdminAuth();
  const nav = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="animate-spin text-primary w-8 h-8" />
      </div>
    );
  }

  if (!user) {
    nav("/admin/login");
    return null;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-6">
        <div className="max-w-md text-center bg-card p-8 rounded-xl border border-border">
          <h1 className="text-xl font-bold text-primary mb-2">Acesso negado</h1>
          <p className="text-muted-foreground mb-4">Sua conta não possui permissão de administrador.</p>
          <button onClick={() => { signOut(); nav("/admin/login"); }} className="text-primary underline">
            Sair
          </button>
        </div>
      </div>
    );
  }

  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
      isActive ? "bg-primary/10 text-primary border border-primary/30" : "text-muted-foreground hover:text-foreground hover:bg-muted"
    }`;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <aside className="fixed left-0 top-0 h-screen w-64 bg-card border-r border-border p-4 flex flex-col">
        <div className="mb-8 px-2">
          <h1 className="text-primary font-bold text-lg neon-text">MAP360</h1>
          <p className="text-xs text-muted-foreground">Painel Administrativo</p>
        </div>
        <nav className="space-y-1 flex-1">
          <NavLink to="/admin" end className={linkCls}><LayoutDashboard size={16} /> Dashboard</NavLink>
          <NavLink to="/admin/tokens" className={linkCls}><KeyRound size={16} /> Tokens</NavLink>
          <NavLink to="/admin/leads" className={linkCls}><Users size={16} /> Leads</NavLink>
          <NavLink to="/admin/resultados" className={linkCls}><FileText size={16} /> Resultados</NavLink>
        </nav>
        <div className="border-t border-border pt-4">
          <p className="text-xs text-muted-foreground px-2 mb-2 truncate">{user.email}</p>
          <button
            onClick={async () => { await signOut(); nav("/admin/login"); }}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <LogOut size={16} /> Sair
          </button>
        </div>
      </aside>
      <main className="ml-64 p-8">{children}</main>
    </div>
  );
}
