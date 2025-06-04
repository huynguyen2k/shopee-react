import { PaginationItemType } from './types'

export function getRangeArray(start: number, end: number) {
  const length = end - start + 1
  return Array.from({ length }, (_, index) => start + index)
}

export function getAriaLabel(
  type: PaginationItemType,
  page: number | null,
  selected: boolean,
) {
  if (type === 'page') {
    return selected ? `Page ${page}` : `Go to page ${page}`
  }
  return `Go to ${type} page`
}
