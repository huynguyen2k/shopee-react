import { forwardRef, useEffect, useRef, useState } from 'react'

const RowAligns = ['top', 'middle', 'bottom', 'stretch'] as const
const RowJustify = [
  'start',
  'end',
  'center',
  'space-around',
  'space-between',
  'space-evenly',
] as const

type Breakpoint = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs'
type Responsive = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs'
type ResponsiveLike<T> = {
  [key in Responsive]?: T
}

// type Gap = number | undefined
export type Gutter = number | undefined | Partial<Record<Breakpoint, number>>

type ResponsiveAligns = ResponsiveLike<(typeof RowAligns)[number]>
type ResponsiveJustify = ResponsiveLike<(typeof RowJustify)[number]>

export type ScreenMap = Partial<Record<Breakpoint, boolean>>

export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  gutter?: Gutter | [Gutter, Gutter]
  align?: (typeof RowAligns)[number] | ResponsiveAligns
  justify?: (typeof RowJustify)[number] | ResponsiveJustify
  wrap?: boolean
}

export const responsiveArray: Breakpoint[] = [
  'xxl',
  'xl',
  'lg',
  'md',
  'sm',
  'xs',
]

function useMergePropByScreen(
  oriProp: RowProps['align'] | RowProps['justify'],
  screen: ScreenMap,
) {
  const [prop, setProp] = useState(typeof oriProp === 'string' ? oriProp : '')

  useEffect(() => {
    const calcMergeAlignOrJustify = () => {
      if (typeof oriProp === 'string') {
        setProp(oriProp)
      }
      if (typeof oriProp !== 'object') {
        return
      }
      for (let i = 0; i < responsiveArray.length; i++) {
        const breakpoint: Breakpoint = responsiveArray[i]
        // if do not match, do nothing
        if (!screen[breakpoint]) {
          // eslint-disable-next-line no-continue
          continue
        }
        const curVal = oriProp[breakpoint]
        if (curVal !== undefined) {
          setProp(curVal)
          return
        }
      }
    }

    calcMergeAlignOrJustify()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(oriProp), screen])

  return prop
}

export const Row = forwardRef<HTMLDivElement, RowProps>(
  (
    { justify, align, className, style, children, gutter, wrap, ...other },
    ref,
  ) => {
    const [screens, setScreens] = useState<ScreenMap>({
      xs: true,
      sm: true,
      md: true,
      lg: true,
      xl: true,
      xxl: true,
    })
    // to save screens info when responsiveObserve callback had been call
    const [curScreens, setCurScreens] = useState<ScreenMap>({
      xs: false,
      sm: false,
      md: false,
      lg: false,
      xl: false,
      xxl: false,
    })

    /* ================================== calc responsive data ================================== */
    const mergeAlign = useMergePropByScreen(align, curScreens)

    const mergeJustify = useMergePropByScreen(justify, curScreens)

    const gutterRef = useRef<Gutter | [Gutter, Gutter]>(gutter)

    console.log(
      ref,
      other,
      mergeAlign,
      mergeJustify,
      screens,
      setScreens,
      setCurScreens,
      gutterRef,
    )

    return <div>Row</div>
  },
)

if (import.meta.env.DEV) Row.displayName = 'Row'
