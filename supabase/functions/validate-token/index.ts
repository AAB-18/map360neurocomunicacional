import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { token } = await req.json();
    if (!token || typeof token !== "string") {
      return json({ valid: false, error: "Token não informado." }, 400);
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: tokenRow, error } = await supabase
      .from("access_tokens")
      .select("*")
      .eq("token", token.trim())
      .maybeSingle();

    if (error) throw error;
    if (!tokenRow) return json({ valid: false, error: "Token inválido." }, 200);

    // Auto-expire if past expires_at
    if (tokenRow.status === "active" && new Date(tokenRow.expires_at) < new Date()) {
      await supabase.from("access_tokens").update({ status: "expired" }).eq("id", tokenRow.id);
      return json({ valid: false, error: "Token expirado." }, 200);
    }

    if (tokenRow.status === "used") return json({ valid: false, error: "Este token já foi utilizado." }, 200);
    if (tokenRow.status === "expired") return json({ valid: false, error: "Token expirado." }, 200);
    if (tokenRow.status === "revoked") return json({ valid: false, error: "Token revogado." }, 200);

    return json({ valid: true, tokenId: tokenRow.id }, 200);
  } catch (e) {
    console.error("validate-token error:", e);
    return json({ valid: false, error: "Erro ao validar token." }, 500);
  }
});

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
