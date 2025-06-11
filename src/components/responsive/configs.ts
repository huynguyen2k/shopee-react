import { Breakpoint, ScreenSizeMap } from './types'

export const defaultBreakpoints: Readonly<ScreenSizeMap> = {
  mobile: 0,
  tablet: 768,
  laptop: 992,
  desktop: 1280,
  wideScreen: 1440,
  fullhd: 1920,
}

/**
 * we are responsive in mobile first so make sure that responsiveArray items are sorted in descending order
 * fullhd > wideScreen > desktop > laptop > tablet > mobile
 */
export const responsiveArray: Breakpoint[] = [
  'fullhd',
  'wideScreen',
  'desktop',
  'laptop',
  'tablet',
  'mobile',
]
