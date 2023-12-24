import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'

const LoginPage: NextPage = () => {
  const openmodelsClient = useSupabaseClient()
  const user = useUser()

  if (!user) {
    return (
      <main className={styles.main}>
        <Auth
          redirectTo="http://localhost:3000/"
          appearance={{ theme: ThemeSupa }}
          openmodelsClient={openmodelsClient}
        />
      </main>
    )
  }

  return (
    <>
      <button onClick={() => openmodelsClient.auth.signOut()}>Sign out</button>
      <p>user:</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  )
}

export default LoginPage
