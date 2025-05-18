import { Link } from 'react-router'

import { Pagination } from '@/components/pagination'
import { BlogList } from '@/features/auth/components/blog-list'
import { blogData } from '@/features/auth/mocks/data'
import { useTheme } from '@/hooks/use-theme'

import classes from './styles.module.scss'

export function Home() {
  const [theme, toggleTheme] = useTheme()

  return (
    <div className={classes.home}>
      <h1 className={classes.title}>Home</h1>
      <button type="button" onClick={toggleTheme}>
        {theme === 'light-theme'
          ? 'Switch to Dark Theme'
          : 'Switch to Light Theme'}
      </button>
      <Link to="/login">Login</Link>

      <BlogList data={blogData} />
      <Pagination page={1} totalPages={10} />
    </div>
  )
}
