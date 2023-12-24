import { useState, useEffect } from 'react'
import './App.css'
import { openmodels } from './openmodelsClient'
import Auth from './Auth'
import Account from './Account'

function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    openmodels.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    openmodels.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? <Auth /> : <Account key={session.user.id} session={session} />}
    </div>
  )
}

export default App
