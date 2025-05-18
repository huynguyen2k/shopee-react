import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router/dom'

// we need to import the SCSS file before the router to make sure
// the main styles are applied before the router styles when build the project
import '@/styles/main.scss'
// eslint-disable-next-line import/order
import { router } from '@/configs/router'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
