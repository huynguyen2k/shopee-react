import { createBrowserRouter } from 'react-router-dom'

import App from '@/app'
import { NotFound } from '@/pages/not-found'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>Opps! Some error has occured!</div>,
    children: [
      {
        index: true,
        element: <div>Home</div>,
      },
      {
        path: 'login',
        element: <div>Login</div>,
      },
      {
        path: 'register',
        element: <div>Register</div>,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
])
