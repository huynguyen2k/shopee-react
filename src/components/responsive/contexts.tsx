import { createContext, useEffect, useMemo, useState } from 'react'

import { defaultBreakpoints } from './configs'
import {
  Breakpoint,
  MatchHandlers,
  ResponsiveContextValue,
  ResponsiveProviderProps,
  ScreenMap,
} from './types'
import { getResponsiveMap, initScreenMap } from './utils'

export const ResponsiveContext = createContext<ResponsiveContextValue | null>(
  null,
)

export function ResponsiveProvider({
  value,
  children,
}: ResponsiveProviderProps) {
  const defaultScreenSize = value ?? defaultBreakpoints

  const [screens, setScreens] = useState<ScreenMap>(() =>
    initScreenMap(defaultScreenSize),
  )

  const responsiveMap = useMemo(
    () => getResponsiveMap(defaultScreenSize),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(defaultScreenSize)],
  )

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
      handler(mql)
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
