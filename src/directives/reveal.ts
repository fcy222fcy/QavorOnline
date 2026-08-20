import type { Directive } from 'vue'

/**
 * v-reveal — fades + lifts an element into view once it enters the viewport.
 * Uses IntersectionObserver; removes itself after the first reveal.
 */
const reveal: Directive<HTMLElement, string | undefined> = {
  mounted(el, binding) {
    const delay = binding.value ? Number(binding.value) || 0 : 0
    if (delay) el.style.transitionDelay = `${delay}ms`

    el.classList.add('reveal')

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      el.classList.add('reveal-visible')
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add('reveal-visible')
            io.unobserve(el)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
  },
}

export default reveal
