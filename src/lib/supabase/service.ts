import "server-only";
import { createClient } from "@supabase/supabase-js";
import { getSupabaseServiceEnv } from "./env";

export function createServiceClient() {
  const { url, secretKey } = getSupabaseServiceEnv();
  return createClient(url, secretKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
