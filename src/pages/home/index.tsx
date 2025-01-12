import { BlogList } from '@/features/auth/components/blog-list'
import { blogData } from '@/features/auth/mocks/data'

export function Home() {
  return (
    <div style={{ padding: '32px' }}>
      <h1 style={{ marginBottom: '32px' }}>Home</h1>
      <BlogList data={blogData} />
    </div>
  )
}
