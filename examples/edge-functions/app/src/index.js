import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Auth } from '@supabase/auth-ui-react'
import { openmodels } from './utils/openmodelsClient'

ReactDOM.render(
  <React.StrictMode>
    <Auth.UserContextProvider openmodelsClient={openmodels}>
      <App />
    </Auth.UserContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
