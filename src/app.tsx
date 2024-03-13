import { Outlet } from 'react-router-dom'

import { ResponsiveProvider } from '@/components/responsive'

function App() {
  return (
    <ResponsiveProvider>
      <Outlet />
    </ResponsiveProvider>
  )
}

export default App
