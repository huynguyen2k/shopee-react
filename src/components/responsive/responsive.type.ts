import { ReactNode } from 'react'

// Define all breakpoints use in the application
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

export type ScreenSizeMap = Record<Breakpoint, number>

export type MediaQueryMap = Record<Breakpoint, string>

export type ScreenMap = Record<Breakpoint, boolean>

export type MatchHandlers = Record<
  Breakpoint,
  | {
      mql: MediaQueryList
      handler: (this: MediaQueryList, ev: MediaQueryListEvent) => any
    }
  | undefined
>

export type ResponsiveContextValue = ScreenMap

export interface ResponsiveProviderProps {
  value?: ScreenSizeMap
  children: ReactNode
}
