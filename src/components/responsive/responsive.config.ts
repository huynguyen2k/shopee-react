import { Breakpoint, ScreenSizeMap } from './responsive.type'

export const defaultBreakpoints: Readonly<ScreenSizeMap> = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1440,
}

/**
 * we are responsive in mobile first so make sure that responsiveArray items are sorted in descending order
 * xxl > xl > lg > md > sm > xs
 */
export const responsiveArray: Breakpoint[] = [
  'xxl',
  'xl',
  'lg',
  'md',
  'sm',
  'xs',
]
