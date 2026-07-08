import { ReactNode } from "react";

export function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary opacity-[0.03] rounded-full blur-[100px] transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary opacity-[0.02] rounded-full blur-[80px] transform -translate-x-1/3 translate-y-1/3"></div>
      </div>
      <div className="relative max-w-3xl mx-auto px-6 py-12 min-h-screen flex flex-col justify-center">
        {children}
        <footer className="mt-12 text-center text-xs text-muted-foreground/50 py-4">
          &copy; {new Date().getFullYear()} MAP360 - NeuroComunicacional · Tutor's Tech
        </footer>
      </div>
    </div>
  );
}
