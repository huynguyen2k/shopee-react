import { useEffect } from 'react'

import { ProductList } from '@/components/ProductList'
import { StudentList } from '@/components/StudentList'

function App() {
  const a = 10

  console.log(a)

  useEffect(() => {
    console.log(a)
  }, [])

  return (
    <div>
      <ProductList />
      <StudentList />
    </div>
  )
}

export default App
