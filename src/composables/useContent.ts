/**
 * useContent — minimal i18n for the static landing page.
 *
 * The site renders in Chinese by default; visitors can switch to English via
 * the navbar toggle. The choice is persisted in localStorage and reflected on
 * <html lang>. All copy lives in `src/data/project.ts` as `content.zh` /
 * `content.en`, so components never hard-code language text.
 */
import { ref, computed, watch } from 'vue'
import { content, type Lang, type Content } from '../data/project'

const STORAGE_KEY = 'qavor-locale'

function readInitial(): Lang {
  if (typeof window === 'undefined') return 'zh'
  const saved = window.localStorage.getItem(STORAGE_KEY)
  return saved === 'en' ? 'en' : 'zh'
}

const locale = ref<Lang>(readInitial())

watch(
  locale,
  (val) => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(STORAGE_KEY, val)
    document.documentElement.lang = val === 'zh' ? 'zh-CN' : 'en'
  },
  { immediate: true },
)

/** Reactive content object for the active locale. */
export function useContent() {
  const data = computed<Content>(() => content[locale.value])
  return data
}

/** Locale state + controls for the language switcher. */
export function useLocale() {
  const setLocale = (l: Lang) => {
    locale.value = l
  }
  const toggleLocale = () => {
    locale.value = locale.value === 'zh' ? 'en' : 'zh'
  }
  return { locale, setLocale, toggleLocale }
}
