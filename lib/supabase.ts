import { createClient } from "@supabase/supabase-js";

function getEnvValue(...names: string[]) {
  for (const name of names) {
    const value = process.env[name];
    if (value) return value;
  }
  return "";
}

export function getSupabaseClient() {
  const supabaseUrl = getEnvValue(
    "NEXT_PUBLIC_SUPABASE_URL",
    "SUPABASE_URL"
  );
  const serviceRoleKey = getEnvValue(
    "SUPABASE_SERVICE_ROLE_KEY",
    "SUPABASE_SERVICE_ROLE",
    "SUPABASE_SECRET_KEY"
  );

  if (!supabaseUrl || !serviceRoleKey) {
    return null;
  }

  return createClient(supabaseUrl, serviceRoleKey);
}

export function hasSupabaseConfig() {
  return Boolean(
    getEnvValue("NEXT_PUBLIC_SUPABASE_URL", "SUPABASE_URL") &&
      getEnvValue(
        "SUPABASE_SERVICE_ROLE_KEY",
        "SUPABASE_SERVICE_ROLE",
        "SUPABASE_SECRET_KEY"
      )
  );
}