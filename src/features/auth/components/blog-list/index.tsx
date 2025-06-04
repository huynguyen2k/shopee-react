import clsx from 'clsx'

import { PERMISSIONS } from '../../configs/permissions'
import { Blog } from '../../types'
import { CommentList } from '../comment-list'
import { RequireAuth } from '../require-auth'

import classes from './styles.module.scss'

interface BlogListProps {
  data?: Blog[]
}

export function BlogList({ data = [] }: BlogListProps) {
  return (
    <div>
      <div className={classes['add-btn-container']}>
        <RequireAuth permission={PERMISSIONS.CREATE_BLOG}>
          <button
            type="button"
            className={clsx(classes.button, classes['add-btn'])}
          >
            Add blog
          </button>
        </RequireAuth>
      </div>
      <div className={classes['blog-list']}>
        {data.map(item => (
          <div key={item.id} className={classes['blog-item']}>
            <div className={classes['blog-info']}>
              <h4>
                {item.id}: {item.title}
              </h4>
              <p>Author: {item.userId}</p>
              <p>
                Invited:{' '}
                {item.invitedUserIds.length === 0
                  ? 'None'
                  : item.invitedUserIds.join(', ')}
              </p>
            </div>
            <div className={classes['action-btns']}>
              <RequireAuth permission={PERMISSIONS.UPDATE_BLOG} resource={item}>
                <button
                  type="button"
                  className={clsx(classes.button, classes['update-btn'])}
                >
                  Update
                </button>
              </RequireAuth>
              <RequireAuth permission={PERMISSIONS.DELETE_BLOG} resource={item}>
                <button
                  type="button"
                  className={clsx(classes.button, classes['delete-btn'])}
                >
                  Delete
                </button>
              </RequireAuth>
            </div>
            <CommentList blog={item} comments={item.comments} />
          </div>
        ))}
      </div>
    </div>
  )
}
