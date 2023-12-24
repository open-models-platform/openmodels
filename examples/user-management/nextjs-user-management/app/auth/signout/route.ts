import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const openmodels = createRouteHandlerClient({ cookies })

  // Check if we have a session
  const {
    data: { session },
  } = await openmodels.auth.getSession()

  if (session) {
    await openmodels.auth.signOut()
  }

  return NextResponse.redirect(new URL('/', req.url), {
    status: 302,
  })
}
