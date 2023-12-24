import { createClient } from "@supabase/supabase-js";
import type { Database } from "./schema";

export const openmodels = createClient<Database>(
  import.meta.env.VITE_OPENMODELS_URL,
  import.meta.env.VITE_OPENMODELS_ANON_KEY
);
