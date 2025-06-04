export interface Comment {
  id: string
  content: string
  userId: string
  blogId: string
}

export interface Blog {
  id: string
  title: string
  content: string
  userId: string
  invitedUserIds: string[]
  comments: Comment[]
}
