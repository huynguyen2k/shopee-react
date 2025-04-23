import clsx from 'clsx'
import React, { CSSProperties, forwardRef } from 'react'

import styles from './styles.module.scss'

export interface ActionProps extends React.HTMLAttributes<HTMLButtonElement> {
  active?: {
    fill: string
    background: string
  }
  cursor?: CSSProperties['cursor']
}

export const Action = forwardRef<HTMLButtonElement, ActionProps>(
  ({ active, className, cursor, style, ...props }, ref) => {
    return (
      <button
        {...props}
        ref={ref}
        type="button"
        className={clsx(styles.Action, className)}
        tabIndex={0}
        style={
          {
            ...style,
            cursor,
            '--fill': active?.fill,
            '--background': active?.background,
          } as CSSProperties
        }
      />
    )
  },
)

Action.displayName = 'Action'
