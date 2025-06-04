import { useEffect, useLayoutEffect, useState } from 'react'

type Theme = 'light-theme' | 'dark-theme'

const THEME_STORAGE_KEY = 'theme'

const getCurrentTheme = () => {
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY)
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)')
  const currentTheme = (storedTheme ||
    (systemPrefersDark.matches ? 'dark-theme' : 'light-theme')) as Theme

  return currentTheme
}

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(getCurrentTheme)

  useLayoutEffect(() => {
    const htmlElement = document.documentElement
    htmlElement.classList.add(theme)

    return () => {
      htmlElement.classList.remove(theme)
    }
  }, [theme])

  useEffect(() => {
    const handleSystemThemeChange = (event: MediaQueryListEvent) => {
      const hasStoredTheme = localStorage.getItem(THEME_STORAGE_KEY)
      if (!hasStoredTheme) {
        const systemTheme = event.matches ? 'dark-theme' : 'light-theme'
        setTheme(systemTheme)
      }
    }

    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)')
    systemPrefersDark.addEventListener('change', handleSystemThemeChange)

    return () => {
      systemPrefersDark.removeEventListener('change', handleSystemThemeChange)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light-theme' ? 'dark-theme' : 'light-theme'
    setTheme(newTheme)
    localStorage.setItem(THEME_STORAGE_KEY, newTheme)
  }

  return [theme, toggleTheme] as const
}
