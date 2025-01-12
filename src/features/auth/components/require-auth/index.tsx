import { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { Permission } from '../../configs/permissions'
import { PolicyKey, PolicyResource } from '../../configs/policies'
import { loggedInUser } from '../../mocks/data'
import { hasPermission } from '../../utils/has-permission'

interface RequireAuthBaseProps {
  permission?: undefined
  resource?: undefined
  fallbackElement?: ReactNode
  children?: ReactNode
}

interface RequireAuthWithPermissionProps<T extends Permission> {
  permission: T
  fallbackElement?: ReactNode
  children?: ReactNode
}

interface RequireAuthWithPermissionAndResourceProps<T extends PolicyKey>
  extends RequireAuthWithPermissionProps<T> {
  resource: PolicyResource<T>
}

type RequireAuthProps<T extends Permission | undefined> = T extends PolicyKey
  ? RequireAuthWithPermissionAndResourceProps<T>
  : T extends Permission
    ? RequireAuthWithPermissionProps<T>
    : RequireAuthBaseProps

export function RequireAuth<T extends Permission | undefined>(
  props: RequireAuthProps<T>,
) {
  const { children, fallbackElement = null } = props

  const location = useLocation()
  const user = loggedInUser
  let canAccess = true

  if (!user) return <Navigate replace to="/login" state={{ from: location }} />

  if (props.permission) {
    canAccess = hasPermission({
      ...props,
      user,
    })
  }

  return canAccess ? children : fallbackElement
}
