// @vitest-environment happy-dom
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import ScreenshotSection from './ScreenshotSection.vue'
import { useLocale } from '../composables/useContent'

afterEach(() => {
  document.body.innerHTML = ''
})

describe('ScreenshotSection', () => {
  it('opens the selected product screenshot in an accessible dialog', async () => {
    useLocale().setLocale('zh')
    const wrapper = mount(ScreenshotSection, {
      attachTo: document.body,
      global: {
        directives: { reveal: () => undefined },
      },
    })

    await wrapper.get('button[aria-label="放大查看 Agent 对话"]').trigger('click')

    const dialog = wrapper.get('[role="dialog"]')
    expect(dialog.attributes('aria-label')).toBe('Agent 对话')
    expect(dialog.get('img').attributes('src')).toContain('screenshots/agent-chat.png')
  })

  it('closes the enlarged screenshot when Escape is pressed', async () => {
    useLocale().setLocale('zh')
    const wrapper = mount(ScreenshotSection, {
      attachTo: document.body,
      global: {
        directives: { reveal: () => undefined },
      },
    })
    await wrapper.get('button[aria-label="放大查看 Agent 对话"]').trigger('click')

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await wrapper.vm.$nextTick()

    expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
  })

  it('closes the enlarged screenshot when the backdrop is selected', async () => {
    useLocale().setLocale('zh')
    const wrapper = mount(ScreenshotSection, {
      attachTo: document.body,
      global: {
        directives: { reveal: () => undefined },
      },
    })
    await wrapper.get('button[aria-label="放大查看 Agent 对话"]').trigger('click')

    await wrapper.get('[role="dialog"]').trigger('click')

    expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
  })
})
