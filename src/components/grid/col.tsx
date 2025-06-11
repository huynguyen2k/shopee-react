import clsx from 'clsx'
import { ComponentPropsWithoutRef, forwardRef } from 'react'

import { ResponsiveProps, useResponsiveProps } from '@/components/responsive'

import { useRow } from './hooks'
import classes from './styles.module.scss'

interface ColProps extends ComponentPropsWithoutRef<'div'> {
  size?: number | ResponsiveProps<number>
  offset?: 'auto' | number | ResponsiveProps<'auto' | number>
}

export const Col = forwardRef<HTMLDivElement, ColProps>(
  (
    {
      size: sizeProp,
      offset: offsetProp,
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const { columns, columnGap } = useRow()

    const size = useResponsiveProps(
      typeof sizeProp === 'number' ? { mobile: sizeProp } : sizeProp ?? {},
    )
    const offset = useResponsiveProps(
      typeof offsetProp === 'string' || typeof offsetProp === 'number'
        ? { mobile: offsetProp }
        : offsetProp ?? {},
    )

    const getColWidth = () => {
      if (!size) return undefined

      return `calc(${size} / ${columns} * 100% - (${columns} - ${size}) * (${
        typeof columnGap === 'number' ? `${columnGap}px` : columnGap ?? '0px'
      } / ${columns}))`
    }

    const getOffsetWidth = () => {
      if (typeof offset === 'number') {
        return `calc(${offset} / ${columns} * 100% + ${offset} * ${
          typeof columnGap === 'number' ? `${columnGap}px` : columnGap ?? '0px'
        } / ${columns})`
      }

      return offset
    }

    const colClasses = clsx(className, classes.col)
    const colStyle = {
      marginLeft: getOffsetWidth(),
      width: getColWidth(),
      ...style,
    }

    return (
      <div ref={ref} className={colClasses} style={colStyle} {...props}>
        {children}
      </div>
    )
  },
)

if (import.meta.env.DEV) Col.displayName = 'Col'
