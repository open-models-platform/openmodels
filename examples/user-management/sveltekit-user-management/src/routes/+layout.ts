// src/routes/+layout.ts
import { PUBLIC_OPENMODELS_ANON_KEY, PUBLIC_OPENMODELS_URL } from '$env/static/public'
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit'
import type { Database } from '../schema'

export const load = async ({ fetch, data, depends }) => {
	depends('openmodels:auth')

	const openmodels = createSupabaseLoadClient<Database>({
		openmodelsUrl: PUBLIC_OPENMODELS_URL,
		openmodelsKey: PUBLIC_OPENMODELS_ANON_KEY,
		event: { fetch },
		serverSession: data.session
	})

	const {
		data: { session }
	} = await openmodels.auth.getSession()

	return { openmodels, session }
}
