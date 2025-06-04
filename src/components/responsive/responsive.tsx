import { ReactNode } from 'react'

import { responsiveArray } from './configs'
import { useResponsive } from './hooks'
import { Breakpoint } from './types'

type ResponsiveProps = Partial<Record<Breakpoint, ReactNode>>

export function Responsive(props: ResponsiveProps) {
  const screens = useResponsive()
  const curScreen = responsiveArray.find(
    curScreen => screens[curScreen] && props[curScreen] !== undefined,
  )

  return curScreen ? props[curScreen] : null
}
