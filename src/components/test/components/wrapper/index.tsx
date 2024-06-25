import clsx from 'clsx'
import React from 'react'

import styles from './styles.module.scss'

interface WrapperProps {
  children: React.ReactNode
  center?: boolean
  style?: React.CSSProperties
}

export function Wrapper({ children, center, style }: WrapperProps) {
  return (
    <div
      className={clsx(styles.Wrapper, center && styles.center)}
      style={style}
    >
      {children}
    </div>
  )
}
