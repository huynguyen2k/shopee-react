import {
  PaginationItem,
  PaginationItemType,
  UsePaginationParams,
} from './types'
import { getAriaLabel, getRangeArray } from './utils'

export function usePagination({
  page,
  totalPages,
  onChange,
  boundaryCount = 1,
  siblingCount = 1,
  disabled = false,
  showPreviousButton = true,
  showNextButton = true,
  showFirstButton = false,
  showLastButton = false,
}: UsePaginationParams): PaginationItem[] {
  const startPages = getRangeArray(1, Math.min(boundaryCount, totalPages))

  const endPages = getRangeArray(
    Math.max(totalPages - boundaryCount + 1, boundaryCount + 1),
    totalPages,
  )

  const siblingsStart = Math.max(
    Math.min(
      // Natural start
      page - siblingCount,
      // Lower boundary when page is high
      totalPages - boundaryCount - siblingCount * 2 - 1,
    ),
    // Greater than startPages
    boundaryCount + 2,
  )

  const siblingsEnd = Math.min(
    Math.max(
      // Natural end
      page + siblingCount,
      // Upper boundary when page is low
      boundaryCount + siblingCount * 2 + 2,
    ),
    // Less than endPages
    endPages.length > 0 ? endPages[0] - 2 : totalPages - 1,
  )

  // Basic list of items to render
  // for example itemList = ['first', 'previous', 1, 'ellipsis', 4, 5, 6, 'ellipsis', 10, 'next', 'last']
  const itemList = [
    ...(showFirstButton ? ['first'] : []),
    ...(showPreviousButton ? ['previous'] : []),
    ...startPages,

    // Start ellipsis
    // eslint-disable-next-line no-nested-ternary
    ...(siblingsStart > boundaryCount + 2
      ? ['start-ellipsis']
      : boundaryCount + 1 < totalPages - boundaryCount
        ? [boundaryCount + 1]
        : []),

    // Sibling pages
    ...getRangeArray(siblingsStart, siblingsEnd),

    // End ellipsis
    // eslint-disable-next-line no-nested-ternary
    ...(siblingsEnd < totalPages - boundaryCount - 1
      ? ['end-ellipsis']
      : totalPages - boundaryCount > boundaryCount
        ? [totalPages - boundaryCount]
        : []),

    ...endPages,
    ...(showNextButton ? ['next'] : []),
    ...(showLastButton ? ['last'] : []),
  ] as (PaginationItemType | number)[]

  const getPageValueByType = (type: PaginationItemType) => {
    switch (type) {
      case 'first':
        return 1
      case 'previous':
        return page - 1
      case 'next':
        return page + 1
      case 'last':
        return totalPages
      default:
        return null
    }
  }

  return itemList.map(item => {
    const isNumberItem = typeof item === 'number'
    const pageValue = isNumberItem ? item : getPageValueByType(item)
    const typeValue = isNumberItem ? 'page' : item
    const selectedValue = isNumberItem ? item === page : false
    const disabledValue = isNumberItem
      ? disabled
      : disabled ||
        (item.indexOf('ellipsis') === -1 &&
          (item === 'next' || item === 'last' ? page >= totalPages : page <= 1))

    const onClick = pageValue === null ? undefined : () => onChange?.(pageValue)

    return {
      onClick,
      type: typeValue,
      page: pageValue,
      selected: selectedValue,
      disabled: disabledValue,
      'aria-label': getAriaLabel(typeValue, pageValue, selectedValue),
      'aria-current': selectedValue ? 'true' : undefined,
    }
  })
}
