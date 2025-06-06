import { useContext } from 'react'

import { responsiveArray } from './configs'
import { ResponsiveContext } from './contexts'
import { ResponsiveProps } from './types'

export function useResponsive() {
  const context = useContext(ResponsiveContext)

  if (!context) {
    throw new Error('useResponsive must be used within a ResponsiveProvider')
  }

  return context
}

export function useResponsiveProps<T>(props: ResponsiveProps<T>) {
  const screens = useResponsive()
  const curScreen = responsiveArray.find(
    curScreen => screens[curScreen] && props[curScreen] !== undefined,
  )

  return curScreen ? props[curScreen] : undefined
}
