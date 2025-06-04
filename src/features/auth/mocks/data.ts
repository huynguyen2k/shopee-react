import { USER_ROLES, User } from '../configs/permissions'
import { Blog } from '../types'

export const loggedInUser: User = {
  id: 'user_01',
  name: 'Huy Nguyen',
  role: USER_ROLES.AUTHOR,
  blockedBy: [],
}

export const blogData: Blog[] = [
  {
    id: 'blog_01',
    title: 'Blog 1',
    content: 'Blog 1 content',
    userId: 'user_01',
    invitedUserIds: ['user_02', 'user_03'],
    comments: [
      {
        id: 'comment_01',
        content: 'Comment 1',
        userId: 'user_01',
        blogId: 'blog_01',
      },
      {
        id: 'comment_02',
        content: 'Comment 2',
        userId: 'user_02',
        blogId: 'blog_01',
      },
      {
        id: 'comment_03',
        content: 'Comment 3',
        userId: 'user_03',
        blogId: 'blog_01',
      },
      {
        id: 'comment_04',
        content: 'Comment 4',
        userId: 'user_04',
        blogId: 'blog_01',
      },
    ],
  },
  {
    id: 'blog_02',
    title: 'Blog 2',
    content: 'Blog 2 content',
    userId: 'user_02',
    invitedUserIds: [],
    comments: [],
  },
  {
    id: 'blog_03',
    title: 'Blog 3',
    content: 'Blog 3 content',
    userId: 'user_03',
    invitedUserIds: [],
    comments: [],
  },
]
