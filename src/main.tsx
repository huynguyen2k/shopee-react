import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
// reset css
import 'sanitize.css'
import 'sanitize.css/forms.css'
import 'sanitize.css/typography.css'

// global styles
import { Loading } from '@/components/loading'
import { router } from '@/configs/router'
import '@/styles/main.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} fallbackElement={<Loading />} />
  </React.StrictMode>,
)
