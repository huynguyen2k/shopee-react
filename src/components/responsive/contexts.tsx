import { createContext, useEffect, useMemo, useState } from 'react'

import { defaultBreakpoints } from './configs'
import {
  Breakpoint,
  MatchHandlers,
  MediaQueryMap,
  ResponsiveContextValue,
  ResponsiveProviderProps,
  ScreenMap,
} from './types'

export const ResponsiveContext = createContext<ResponsiveContextValue | null>(
  null,
)

export function ResponsiveProvider({
  value,
  children,
}: ResponsiveProviderProps) {
  const defaultScreenSize = value ?? defaultBreakpoints

  const responsiveMap = useMemo(() => {
    return Object.entries(defaultScreenSize).reduce(
      (result, [key, value]) => ({
        ...result,
        [key]: `(min-width: ${value}px)`,
      }),
      {} as MediaQueryMap,
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(defaultScreenSize)])

  const [screens, setScreens] = useState<ScreenMap>(() => {
    return Object.entries(responsiveMap).reduce(
      (result, [curScreen, mediaQuery]) => {
        const mql = window.matchMedia(mediaQuery)
        return {
          ...result,
          [curScreen]: mql.matches,
        }
      },
      {} as ScreenMap,
    )
  })

  useEffect(() => {
    const matchHandlers = {} as MatchHandlers

    Object.entries(responsiveMap).forEach(([curScreen, mediaQuery]) => {
      const mql = window.matchMedia(mediaQuery)
      const handler = ({ matches }: { matches: boolean }) => {
        setScreens(prevScreen => ({ ...prevScreen, [curScreen]: matches }))
      }

      mql.addEventListener('change', handler)
      matchHandlers[curScreen as Breakpoint] = {
        mql,
        handler,
      }
    })

    return () => {
      Object.keys(responsiveMap).forEach(curScreen => {
        const handler = matchHandlers[curScreen as Breakpoint]
        if (handler) handler.mql.removeEventListener('change', handler.handler)
      })
    }
  }, [responsiveMap])

  return (
    <ResponsiveContext.Provider value={screens}>
      {children}
    </ResponsiveContext.Provider>
  )
}
