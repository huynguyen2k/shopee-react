import clsx from 'clsx'
import React, { forwardRef } from 'react'

import styles from './styles.module.scss'

export interface ListProps {
  children: React.ReactNode
  columns?: number
  style?: React.CSSProperties
  horizontal?: boolean
}

export const List = forwardRef<HTMLUListElement, ListProps>(
  ({ children, columns = 1, horizontal, style }, ref) => {
    return (
      <ul
        ref={ref}
        style={
          {
            ...style,
            '--columns': columns,
          } as React.CSSProperties
        }
        className={clsx(styles.List, horizontal && styles.horizontal)}
      >
        {children}
      </ul>
    )
  },
)

List.displayName = 'List'
