import { Component, createEffect, createSignal } from 'solid-js'
import { openmodels } from './openmodelsClient'
import { AuthSession } from '@supabase/supabase-js'
import Account from './Account'
import Auth from './Auth'

const App: Component = () => {
	const [session, setSession] = createSignal<AuthSession | null>(null)

	createEffect(() => {
		openmodels.auth.getSession().then(({ data: { session } }) => {
			setSession(session)
		})

		openmodels.auth.onAuthStateChange((_event, session) => {
			setSession(session)
		})
	})

	return (
		<div class="container" style={{ padding: '50px 0 100px 0' }}>
			{!session() ? <Auth /> : <Account session={session()!} />}
		</div>
	)
}

export default App
