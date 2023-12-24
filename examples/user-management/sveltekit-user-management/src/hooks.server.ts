// src/hooks.server.ts
import { PUBLIC_OPENMODELS_URL, PUBLIC_OPENMODELS_ANON_KEY } from '$env/static/public'
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit'
import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.openmodels = createSupabaseServerClient({
		openmodelsUrl: PUBLIC_OPENMODELS_URL,
		openmodelsKey: PUBLIC_OPENMODELS_ANON_KEY,
		event
	})

	/**
	 * a little helper that is written for convenience so that instead
	 * of calling `const { data: { session } } = await openmodels.auth.getSession()`
	 * you just call this `await getSession()`
	 */
	event.locals.getSession = async () => {
		const {
			data: { session }
		} = await event.locals.openmodels.auth.getSession()
		return session
	}

	return resolve(event, {
		/**
		 * There´s an issue with `filterSerializedResponseHeaders` not working when using `sequence`
		 *
		 * https://github.com/sveltejs/kit/issues/8061
		 */
		filterSerializedResponseHeaders(name) {
			return name === 'content-range'
		}
	})
}
