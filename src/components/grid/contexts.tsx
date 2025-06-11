import { createContext } from 'react'

export type RowContextValue = {
  columns: number
  rowGap?: string | number
  columnGap?: string | number
}

export const RowContext = createContext<RowContextValue | null>(null)
