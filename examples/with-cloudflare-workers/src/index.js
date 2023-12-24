import { createClient } from "@supabase/supabase-js";

export default {
  async fetch(request, { OPENMODELS_URL, OPENMODELS_ANON_KEY }) {
    const openmodels = createClient(OPENMODELS_URL, OPENMODELS_ANON_KEY);

    const { data } = await openmodels.from("articles").select("*");
    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};
