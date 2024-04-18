import { useState } from 'react'

import { Pagination } from '@/components/pagination'

export function Home() {
  const [page, setPage] = useState(1)

  return (
    <div style={{ margin: '32px' }}>
      <Pagination
        page={page}
        onChange={newPage => {
          setPage(newPage)
        }}
        totalPages={15}
        showFirstButton
        showPreviousButton
        showNextButton
        showLastButton
        disabled={false}
        boundaryCount={1}
        siblingCount={1}
      />
    </div>
  )
}
