import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { participantId, answers } = await req.json();
    if (!participantId || !answers || typeof answers !== "object") {
      return json({ error: "Dados incompletos." }, 400);
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const counts = { S: 0, R: 0, V: 0, P: 0 } as Record<string, number>;
    Object.values(answers).forEach((t) => {
      if (typeof t === "string" && counts[t] !== undefined) counts[t]++;
    });
    const dominant = Object.keys(counts).reduce((a, b) => (counts[a] >= counts[b] ? a : b));

    const { data, error } = await supabase
      .from("test_results")
      .insert({
        participant_id: participantId,
        answers,
        score_s: counts.S,
        score_r: counts.R,
        score_v: counts.V,
        score_p: counts.P,
        dominant_profile: dominant,
      })
      .select()
      .single();

    if (error) throw error;

    return json({ resultId: data.id, dominant, scores: counts }, 200);
  } catch (e) {
    console.error("submit-result error:", e);
    return json({ error: "Erro ao salvar resultado." }, 500);
  }
});

function json(b: unknown, status: number) {
  return new Response(JSON.stringify(b), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
