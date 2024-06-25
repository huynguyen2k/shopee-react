import { Outlet } from 'react-router-dom'

import { ResponsiveProvider } from '@/components/responsive'

function App() {
  const a = 10

  console.log(a)

  return (
    <ResponsiveProvider>
      <Outlet />
    </ResponsiveProvider>
  )
}

export default App
