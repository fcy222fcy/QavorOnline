// @vitest-environment happy-dom
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import Navbar from './Navbar.vue'

describe('Navbar', () => {
  beforeEach(() => {
    window.localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: vi.fn().mockReturnValue({ matches: false }),
    })
  })

  it('shows the Qavor project logo in the brand link', () => {
    const wrapper = mount(Navbar)

    const logo = wrapper.get('a[href="#top"] img[alt="Qavor 项目图标"]')
    expect(logo.attributes('src')).toMatch(/\/qavor-logo\.png$/)
  })

  it('follows the light system theme and persists a switch to dark', async () => {
    const wrapper = mount(Navbar)

    expect(document.documentElement.dataset.theme).toBe('light')

    const toggle = wrapper.get('button[aria-label="切换到夜间模式"]')
    await toggle.trigger('click')

    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(window.localStorage.getItem('qavor-theme')).toBe('dark')
    expect(toggle.attributes('aria-label')).toBe('切换到亮色模式')
  })

  it('restores a saved dark theme instead of the system preference', () => {
    window.localStorage.setItem('qavor-theme', 'dark')

    const wrapper = mount(Navbar)

    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(wrapper.find('button[aria-label="切换到亮色模式"]').exists()).toBe(true)
  })
})
