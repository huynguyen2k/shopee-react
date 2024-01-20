import classes from './styles.module.scss'

export function NotFound() {
  return (
    <div className={classes['not-found']}>
      <div className={classes.content}>Opps! This page is not found</div>
    </div>
  )
}
