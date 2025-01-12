import { Blog, Comment } from '../types'

import { PERMISSIONS, Permission, USER_ROLES, User } from './permissions'

export type PolicyKey = keyof typeof POLICIES
export type PolicyResource<T extends PolicyKey> = Parameters<
  (typeof POLICIES)[T]
>[1]

type Policies = {
  [key in Permission]?: (user: User, resource: any) => boolean
}

export const POLICIES = {
  [PERMISSIONS.UPDATE_BLOG]: (user, blog: Blog) => {
    const isAdmin = user.role === USER_ROLES.ADMIN
    const isBlogAuthor = user.id === blog.userId
    const isInvitedUser = blog.invitedUserIds.includes(user.id)

    return isAdmin || isBlogAuthor || isInvitedUser
  },
  [PERMISSIONS.DELETE_BLOG]: (user, blog: Blog) => {
    const isAdmin = user.role === USER_ROLES.ADMIN
    const isBlogAuthor = user.id === blog.userId

    return isAdmin || isBlogAuthor
  },
  [PERMISSIONS.CREATE_COMMENT]: (user, blog: Blog) => {
    const isAdmin = user.role === USER_ROLES.ADMIN
    const isBlockedByBlogAuthor = user.blockedBy.includes(blog.userId)

    return isAdmin || !isBlockedByBlogAuthor
  },
  [PERMISSIONS.UPDATE_COMMENT]: (
    user,
    { blog, comment }: { blog: Blog; comment: Comment },
  ) => {
    const isAdmin = user.role === USER_ROLES.ADMIN
    const isCommentOwner = user.id === comment.userId
    const isBlockedByBlogAuthor = user.blockedBy.includes(blog.userId)

    return isCommentOwner && (isAdmin || !isBlockedByBlogAuthor)
  },
  [PERMISSIONS.DELETE_COMMENT]: (
    user,
    { blog, comment }: { blog: Blog; comment: Comment },
  ) => {
    const isAdmin = user.role === USER_ROLES.ADMIN
    const isCommentOwner = user.id === comment.userId
    const isCommentOnYourBlog =
      blog.userId === user.id && comment.blogId === blog.id
    const isCommentOnBlogYouAreInvited = blog.invitedUserIds.includes(user.id)

    return (
      isAdmin ||
      isCommentOwner ||
      isCommentOnYourBlog ||
      isCommentOnBlogYouAreInvited
    )
  },
} satisfies Policies
