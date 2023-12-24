import { createClient } from "@refinedev/openmodels";


const openmodelsUrl = import.meta.env.VITE_OPENMODELS_URL;
const openmodelsAnonKey = import.meta.env.VITE_OPENMODELS_ANON_KEY;

export const openmodelsClient = createClient(openmodelsUrl, openmodelsAnonKey, {
  db: {
    schema: "public",
  },
  auth: {
    persistSession: true,
  },
});
