import { DraggableSyntheticListeners } from '@dnd-kit/core'
import clsx from 'clsx'
import { CSSProperties, forwardRef, memo, ReactNode, useEffect } from 'react'

import { Handle } from './handle'
import { Remove } from './remove'
import classes from './styles.module.scss'

export interface ItemProps {
  dragOverlay?: boolean
  dragging?: boolean
  disabled?: boolean
  handle?: boolean
  handleProps?: any
  listeners?: DraggableSyntheticListeners
  wrapperStyle?: CSSProperties
  value: ReactNode
  onRemove?(): void
}

export const Item = memo(
  forwardRef<HTMLLIElement, ItemProps>(
    (
      {
        dragOverlay,
        dragging,
        disabled,
        handle,
        handleProps,
        listeners,
        wrapperStyle,
        value,
        onRemove,
        ...props
      },
      ref,
    ) => {
      useEffect(() => {
        if (!dragOverlay) return
        document.body.style.cursor = 'grabbing'

        return () => {
          document.body.style.cursor = ''
        }
      }, [dragOverlay])

      return (
        <li
          ref={ref}
          className={clsx(classes.Wrapper, dragOverlay && classes.dragOverlay)}
          style={wrapperStyle}
        >
          <div
            className={clsx(
              classes.Item,
              dragging && classes.dragging,
              handle && classes.withHandle,
              dragOverlay && classes.dragOverlay,
              disabled && classes.disabled,
            )}
            {...(!handle ? listeners : undefined)}
            {...props}
            tabIndex={!handle ? 0 : undefined}
          >
            {value}
            <span className={classes.Actions}>
              {onRemove ? (
                <Remove className={classes.Remove} onClick={onRemove} />
              ) : null}
              {handle ? <Handle {...handleProps} {...listeners} /> : null}
            </span>
          </div>
        </li>
      )
    },
  ),
)

Item.displayName = 'Item'
