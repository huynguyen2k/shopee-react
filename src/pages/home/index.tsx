import { Pagination } from '@/components/pagination'
import { BlogList } from '@/features/auth/components/blog-list'
import { blogData } from '@/features/auth/mocks/data'

import classes from './styles.module.scss'

export function Home() {
  return (
    <div style={{ padding: '32px' }}>
      <h1 className={classes.title}>Home</h1>
      <BlogList data={blogData} />

      <Pagination page={1} totalPages={10} />
    </div>
  )
}
