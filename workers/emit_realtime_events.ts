import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export async function emitRealtime(event, payload) {
  await supabase
    .from("realtime_events")
    .insert({ event, payload, created_at: new Date().toISOString() });
}

