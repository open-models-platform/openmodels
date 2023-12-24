import { redirect } from '@sveltejs/kit'

export const GET = async ({ url, locals: { openmodels } }) => {
	const code = url.searchParams.get('code')

	if (code) {
		await openmodels.auth.exchangeCodeForSession(code)
	}

	throw redirect(303, '/account')
}
