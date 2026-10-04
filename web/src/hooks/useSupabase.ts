import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "../config";

let client: any = null;

/**
 * CosmaCare Supabase Client (Layer‑3)
 * Shared across all web routes and components.
 */
export function useSupabase() {
  if (!client) {
    client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: false
      }
    });
  }

  return client;
}

