import { createBrowserRouter } from 'react-router-dom'

import App from '@/app'
import { ROUTES } from '@/configs/routes'
import { Home } from '@/pages/home'
import { Login } from '@/pages/login'
import { NotFound } from '@/pages/not-found'
import { ProductDetail } from '@/pages/product-detail'
import { ProductList } from '@/pages/product-list'
import { Register } from '@/pages/register'

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <App />,
    errorElement: <div>Opps! Some error has occured!</div>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: ROUTES.LOGIN,
        element: <Login />,
      },
      {
        path: ROUTES.REGISTER,
        element: <Register />,
      },
      {
        path: ROUTES.PRODUCT_LIST,
        element: <ProductList />,
      },
      {
        path: ROUTES.PRODUCT_DETAIL,
        element: <ProductDetail />,
      },
      {
        path: ROUTES.NOT_FOUND,
        element: <NotFound />,
      },
    ],
  },
])
