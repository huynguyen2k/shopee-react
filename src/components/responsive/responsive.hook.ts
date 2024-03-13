import { responsiveArray } from './responsive.config'
import { useResponsive } from './responsive.context'
import { Breakpoint } from './responsive.type'

export function useReponsiveProps<T>(props: Partial<Record<Breakpoint, T>>) {
  const screens = useResponsive()
  const curScreen = responsiveArray.find(
    curScreen => screens[curScreen] && props[curScreen] !== undefined,
  )

  return curScreen ? props[curScreen] : undefined
}
