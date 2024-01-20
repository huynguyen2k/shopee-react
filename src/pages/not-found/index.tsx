import className from './styles.module.scss'

export function NotFound() {
  return (
    <div className={className['not-found']}>
      <div className={className.content}>Opps! This page is not found</div>
    </div>
  )
}
