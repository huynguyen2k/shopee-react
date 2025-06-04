import clsx from 'clsx'

import { PERMISSIONS } from '../../configs/permissions'
import { Blog, Comment } from '../../types'
import { RequireAuth } from '../require-auth'

import classes from './styles.module.scss'

interface CommentListProps {
  blog: Blog
  comments: Comment[]
}

export function CommentList({ blog, comments }: CommentListProps) {
  return (
    <div>
      <div className={classes['add-btn-container']}>
        <RequireAuth permission={PERMISSIONS.CREATE_COMMENT} resource={blog}>
          <button
            type="button"
            className={clsx(classes.button, classes['add-btn'])}
          >
            Add comment
          </button>
        </RequireAuth>
      </div>
      <div className={classes['comment-list']}>
        {comments.map(comment => (
          <div key={comment.id} className={classes['comment-item']}>
            <p>
              {comment.userId}: {comment.content}
            </p>
            <div className={classes['action-btns']}>
              <RequireAuth
                permission={PERMISSIONS.UPDATE_COMMENT}
                resource={{ blog, comment }}
              >
                <button
                  type="button"
                  className={clsx(classes.button, classes['update-btn'])}
                >
                  Update
                </button>
              </RequireAuth>
              <RequireAuth
                permission={PERMISSIONS.DELETE_COMMENT}
                resource={{ blog, comment }}
              >
                <button
                  type="button"
                  className={clsx(classes.button, classes['delete-btn'])}
                >
                  Delete
                </button>
              </RequireAuth>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
