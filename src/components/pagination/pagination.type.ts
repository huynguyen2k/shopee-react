import { AriaAttributes, ComponentPropsWithoutRef } from 'react'

import { OverrideProps } from '@/types/common'

export interface UsePaginationParams {
  page: number
  totalPages: number
  onChange?: (page: number) => void
  boundaryCount?: number
  siblingCount?: number
  disabled?: boolean
  showPreviousButton?: boolean
  showNextButton?: boolean
  showFirstButton?: boolean
  showLastButton?: boolean
}

export type PaginationItemType =
  | 'page'
  | 'first'
  | 'last'
  | 'next'
  | 'previous'
  | 'start-ellipsis'
  | 'end-ellipsis'

export interface PaginationItem {
  onClick?: React.ReactEventHandler
  type: PaginationItemType
  page: number | null
  selected: boolean
  disabled: boolean
  'aria-label'?: string
  'aria-current'?: AriaAttributes['aria-current']
}

export type PaginationProps = OverrideProps<
  ComponentPropsWithoutRef<'nav'>,
  UsePaginationParams
>
