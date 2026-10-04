import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "../config";

let client: any = null;

export function useSupabase() {
  if (!client) {
    client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  return client;
}

