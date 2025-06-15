import clsx from 'clsx'
import { ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react'

import classes from './styles.module.scss'

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  fullWidth?: boolean
  loading?: boolean
  variant?: 'contained' | 'outlined' | 'text'
  color?: 'default' | 'primary' | 'danger' | 'success' | 'info' | 'warning'
  disabled?: boolean
  startIcon?: ReactNode
  endIcon?: ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      fullWidth = false,
      loading = false,
      variant = 'contained',
      color = 'default',
      disabled,
      startIcon,
      endIcon,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        className={clsx(
          className,
          classes.button,
          classes[variant],
          classes[color],
          {
            [classes['full-width']]: fullWidth,
          },
        )}
        disabled={disabled || loading}
        {...props}
      >
        {startIcon && startIcon}
        {children}
        {endIcon && endIcon}
      </button>
    )
  },
)

if (import.meta.env.DEV) Button.displayName = 'Button'
