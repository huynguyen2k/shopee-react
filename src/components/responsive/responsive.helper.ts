import { MediaQueryMap, ScreenMap, ScreenSizeMap } from './responsive.type'

export function getResponsiveMap(breakpoints: ScreenSizeMap) {
  return Object.entries(breakpoints).reduce(
    (result, [key, value]) => ({ ...result, [key]: `(min-width: ${value}px)` }),
    {},
  ) as MediaQueryMap
}

export function initScreenMap(breakpoints: ScreenSizeMap) {
  return Object.keys(breakpoints).reduce(
    (acc, cur) => ({ ...acc, [cur]: false }),
    {},
  ) as ScreenMap
}
