import { Button } from '@/components/button'

import classes from './styles.module.scss'

export function Home() {
  return (
    <div className={classes.home}>
      <h1 className={classes.title}>Home</h1>
      <Button>Test</Button>
    </div>
  )
}
