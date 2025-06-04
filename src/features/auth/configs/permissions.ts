export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES]
export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS]
export type User = {
  id: string
  name: string
  role: UserRole
  blockedBy: string[]
}

export const USER_ROLES = {
  ADMIN: 'admin',
  AUTHOR: 'author',
  USER: 'user',
} as const

export const PERMISSIONS = {
  // Blog permissions
  VIEW_BLOG: 'view:blog',
  CREATE_BLOG: 'create:blog',
  UPDATE_BLOG: 'update:blog',
  DELETE_BLOG: 'delete:blog',

  // Comment permissions
  VIEW_COMMENT: 'view:comment',
  CREATE_COMMENT: 'create:comment',
  UPDATE_COMMENT: 'update:comment',
  DELETE_COMMENT: 'delete:comment',
} as const

export const USER_PERMISSIONS: Record<UserRole, Permission[]> = {
  [USER_ROLES.ADMIN]: [
    PERMISSIONS.VIEW_BLOG,
    PERMISSIONS.CREATE_BLOG,
    PERMISSIONS.UPDATE_BLOG,
    PERMISSIONS.DELETE_BLOG,
    PERMISSIONS.VIEW_COMMENT,
    PERMISSIONS.CREATE_COMMENT,
    // update your own comments
    PERMISSIONS.UPDATE_COMMENT,
    PERMISSIONS.DELETE_COMMENT,
  ],
  [USER_ROLES.AUTHOR]: [
    PERMISSIONS.VIEW_BLOG,
    PERMISSIONS.CREATE_BLOG,
    // update your own blogs or blogs you are invited to
    PERMISSIONS.UPDATE_BLOG,
    // delete your own blogs
    PERMISSIONS.DELETE_BLOG,
    PERMISSIONS.VIEW_COMMENT,
    // create comments on user's blogs that you are not blocked from
    PERMISSIONS.CREATE_COMMENT,
    // update your own comments on user's blogs that you are not blocked from
    PERMISSIONS.UPDATE_COMMENT,
    // delete your own comments or comments on your own blogs
    // or comments on blogs you are invited to
    PERMISSIONS.DELETE_COMMENT,
  ],
  [USER_ROLES.USER]: [
    PERMISSIONS.VIEW_BLOG,
    // update blogs that you are invited to
    PERMISSIONS.UPDATE_BLOG,
    PERMISSIONS.VIEW_COMMENT,
    // create comments on user's blogs that you are not blocked from
    PERMISSIONS.CREATE_COMMENT,
    // update your own comments on user's blogs that you are not blocked from
    PERMISSIONS.UPDATE_COMMENT,
    // delete your own comments or comments on blogs you are invited to
    PERMISSIONS.DELETE_COMMENT,
  ],
}
