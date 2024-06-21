import clsx from 'clsx'
import { ElementRef, ReactNode, forwardRef } from 'react'

import FirstPageIcon from '@/assets/icons/first-page.svg?react'
import LastPageIcon from '@/assets/icons/last-page.svg?react'
import NextIcon from '@/assets/icons/next.svg?react'
import PreviousIcon from '@/assets/icons/previous.svg?react'

import { usePagination } from './pagination.hook'
import classes from './pagination.module.scss'
import { PaginationItemType, PaginationProps } from './pagination.type'

export const Pagination = forwardRef<ElementRef<'nav'>, PaginationProps>(
  (
    {
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
      ...restProps
    },
    ref,
  ) => {
    const itemList = usePagination({
      page,
      totalPages,
      onChange,
      boundaryCount,
      siblingCount,
      disabled,
      showPreviousButton,
      showNextButton,
      showFirstButton,
      showLastButton,
    })

    const paginationIcons: Partial<Record<PaginationItemType, ReactNode>> = {
      first: <FirstPageIcon className={classes.icon} />,
      last: <LastPageIcon className={classes.icon} />,
      next: <NextIcon className={classes.icon} />,
      previous: <PreviousIcon className={classes.icon} />,
    }

    return (
      <nav ref={ref} aria-label="Pagination Navigation" {...restProps}>
        <ul className={classes.pagination}>
          {itemList.map(item => {
            if (
              item.type === 'start-ellipsis' ||
              item.type === 'end-ellipsis'
            ) {
              return (
                <li key={item.type}>
                  <span
                    className={clsx(
                      classes['pagination-item'],
                      classes.ellipsis,
                      {
                        [classes.disabled]: disabled,
                      },
                    )}
                  >
                    &#8230;
                  </span>
                </li>
              )
            }

            return (
              <li key={item.type === 'page' ? item.page : item.type}>
                <button
                  type="button"
                  aria-label={item['aria-label']}
                  aria-current={item['aria-current']}
                  className={clsx(classes['pagination-item'], {
                    [classes.selected]: item.selected,
                    [classes.disabled]: item.disabled,
                  })}
                  onClick={item.onClick}
                  disabled={item.disabled}
                >
                  {item.type === 'page'
                    ? item.page
                    : paginationIcons[item.type]}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    )
  },
)

if (import.meta.env.DEV) Pagination.displayName = 'Pagination'
