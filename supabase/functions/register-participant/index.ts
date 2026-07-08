import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function parseUA(ua: string) {
  let browser = "Desconhecido";
  let device = "Desktop";
  if (/Mobi|Android|iPhone|iPad/i.test(ua)) device = "Mobile";
  if (/Chrome/i.test(ua) && !/Edg/i.test(ua)) browser = "Chrome";
  else if (/Firefox/i.test(ua)) browser = "Firefox";
  else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = "Safari";
  else if (/Edg/i.test(ua)) browser = "Edge";
  return { browser, device };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const body = await req.json();
    const {
      token,
      name,
      email,
      whatsapp,
      profession,
      education,
      lgpd,
      company,
      role_position,
      city,
      state,
      referral,
    } = body ?? {};

    if (!token || !name || !email || !whatsapp || !profession || !education || !lgpd) {
      return json({ error: "Campos obrigatórios ausentes." }, 400);
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: tokenRow, error: tokErr } = await supabase
      .from("access_tokens")
      .select("*")
      .eq("token", String(token).trim())
      .maybeSingle();

    if (tokErr) throw tokErr;
    if (!tokenRow) return json({ error: "Token inválido." }, 400);

    if (tokenRow.status === "active" && new Date(tokenRow.expires_at) < new Date()) {
      await supabase.from("access_tokens").update({ status: "expired" }).eq("id", tokenRow.id);
      return json({ error: "Token expirado." }, 400);
    }
    if (tokenRow.status !== "active") {
      return json({ error: `Token ${tokenRow.status}.` }, 400);
    }

    // Insert participant
    const { data: participant, error: pErr } = await supabase
      .from("participants")
      .insert({
        token_id: tokenRow.id,
        name,
        email,
        whatsapp,
        profession,
        education,
        company: company || null,
        role_position: role_position || null,
        city: city || null,
        state: state || null,
        referral: referral || null,
        lgpd_accepted: !!lgpd,
      })
      .select()
      .single();

    if (pErr) throw pErr;

    // Mark token as used + audit
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null;
    const ua = req.headers.get("user-agent") || "";
    const { browser, device } = parseUA(ua);

    await supabase
      .from("access_tokens")
      .update({
        status: "used",
        used_at: new Date().toISOString(),
        ip_address: ip,
        user_agent: ua,
        browser,
        device,
      })
      .eq("id", tokenRow.id);

    return json({ participantId: participant.id }, 200);
  } catch (e) {
    console.error("register-participant error:", e);
    return json({ error: "Erro ao registrar participante." }, 500);
  }
});

function json(b: unknown, status: number) {
  return new Response(JSON.stringify(b), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
