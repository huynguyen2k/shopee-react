import { useContext } from 'react'

import { ResponsiveProps, useResponsiveProps } from '@/components/responsive'

import { RowContext } from './contexts'

type GapValue = string | number | undefined | ResponsiveProps<string | number>
export type GapProp = GapValue | [GapValue, GapValue]

export const useGap = (gap?: GapProp) => {
  const isArray = Array.isArray(gap)
  const rowGapProp = isArray ? gap[0] : gap
  const colGapProp = isArray ? gap[1] : gap

  const rowGap = useResponsiveProps(
    typeof rowGapProp === 'string' || typeof rowGapProp === 'number'
      ? { mobile: rowGapProp }
      : rowGapProp ?? {},
  )
  const colGap = useResponsiveProps(
    typeof colGapProp === 'string' || typeof colGapProp === 'number'
      ? { mobile: colGapProp }
      : colGapProp ?? {},
  )

  return [rowGap, colGap] as const
}

export const useRow = () => {
  const context = useContext(RowContext)

  if (!context) {
    throw new Error('useRow hook must be used within a RowProvider')
  }

  return context
}
