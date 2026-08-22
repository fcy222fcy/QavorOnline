import { ref } from 'vue'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'qavor-theme'
const theme = ref<Theme>('dark')

function readInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'

  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (saved === 'light' || saved === 'dark') return saved

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(value: Theme) {
  theme.value = value
  document.documentElement.dataset.theme = value
  document.documentElement.style.colorScheme = value
}

export function useTheme() {
  const initializeTheme = () => applyTheme(readInitialTheme())

  const toggleTheme = () => {
    const next: Theme = theme.value === 'dark' ? 'light' : 'dark'
    window.localStorage.setItem(STORAGE_KEY, next)
    applyTheme(next)
  }

  return { theme, initializeTheme, toggleTheme }
}
