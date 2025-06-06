import { HelmetProvider } from 'react-helmet-async'
import { Outlet } from 'react-router'

import { ResponsiveProvider } from '@/components/responsive'

export function App() {
  return (
    <HelmetProvider>
      <ResponsiveProvider>
        <Outlet />
      </ResponsiveProvider>
    </HelmetProvider>
  )
}
