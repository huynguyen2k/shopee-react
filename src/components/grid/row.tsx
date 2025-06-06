import clsx from 'clsx'
import {
  ComponentPropsWithoutRef,
  CSSProperties,
  forwardRef,
  useMemo,
} from 'react'

import { ResponsiveProps, useResponsiveProps } from '@/components/responsive'

import { RowContext, RowContextValue } from './contexts'
import { GapProp, useGap } from './hooks'
import classes from './styles.module.scss'

type AlignValue = 'top' | 'middle' | 'bottom' | 'stretch'
type JustifyValue =
  | 'start'
  | 'end'
  | 'center'
  | 'space-around'
  | 'space-between'
  | 'space-evenly'

interface RowProps extends ComponentPropsWithoutRef<'div'> {
  columns?: number
  wrap?: 'wrap' | 'nowrap' | 'wrap-reverse'
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  gap?: GapProp
  align?: AlignValue | ResponsiveProps<AlignValue>
  justify?: JustifyValue | ResponsiveProps<JustifyValue>
}

export const Row = forwardRef<HTMLDivElement, RowProps>(
  (
    {
      columns = 12,
      wrap = 'wrap',
      direction = 'row',
      gap,
      align: alignProp,
      justify: justifyProp,
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const [rowGap, columnGap] = useGap(gap)
    const align = useResponsiveProps(
      typeof alignProp === 'string' ? { mobile: alignProp } : alignProp ?? {},
    )
    const justify = useResponsiveProps(
      typeof justifyProp === 'string'
        ? { mobile: justifyProp }
        : justifyProp ?? {},
    )

    const rowClasses = clsx(
      className,
      classes.row,
      classes[wrap],
      classes[`direction-${direction}`],
      align && classes[`align-${align}`],
      justify && classes[`justify-${justify}`],
    )
    const rowStyle: CSSProperties = {
      rowGap,
      columnGap,
      ...style,
    }

    const rowContext = useMemo<RowContextValue>(
      () => ({
        columns,
        rowGap,
        columnGap,
      }),
      [columns, rowGap, columnGap],
    )

    return (
      <RowContext.Provider value={rowContext}>
        <div ref={ref} className={rowClasses} style={rowStyle} {...props}>
          {children}
        </div>
      </RowContext.Provider>
    )
  },
)

if (import.meta.env.DEV) Row.displayName = 'Row'
