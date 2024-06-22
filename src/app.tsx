import { HelmetProvider } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'

import { ResponsiveProvider } from '@/components/responsive'

function App() {
  return (
    <HelmetProvider>
      <ResponsiveProvider>
        <Outlet />
      </ResponsiveProvider>
    </HelmetProvider>
  )
}

export default App
