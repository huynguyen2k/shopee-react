import { Permission, USER_PERMISSIONS, User } from '../configs/permissions'
import { POLICIES, PolicyKey, PolicyResource } from '../configs/policies'

export const hasPermission = <T extends Permission>(
  props: T extends PolicyKey
    ? { user: User; permission: T; resource: PolicyResource<T> }
    : { user: User; permission: T },
) => {
  let isSatisfiedPolicy = true

  if ('resource' in props) {
    isSatisfiedPolicy = POLICIES[props.permission](
      props.user,
      props.resource as never,
    )
  }

  return (
    USER_PERMISSIONS[props.user.role].includes(props.permission) &&
    isSatisfiedPolicy
  )
}
