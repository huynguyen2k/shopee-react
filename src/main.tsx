import React from 'react'
import ReactDOM from 'react-dom/client'
// reset css
import 'sanitize.css'
import 'sanitize.css/forms.css'
import 'sanitize.css/typography.css'

import App from '@/app'
import '@/index.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
