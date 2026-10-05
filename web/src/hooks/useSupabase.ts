import { createClient } from "@supabase/supabase-js";
import { ENV } from "../config";

let supabase: any = null;

export function useSupabase() {
  if (!supabase) {
    supabase = createClient(ENV.supabaseUrl, ENV.supabaseAnonKey, {
      auth: { persistSession: false }
    });
  }

  return supabase;
}

