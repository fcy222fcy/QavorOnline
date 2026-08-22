// @vitest-environment happy-dom
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Navbar from './Navbar.vue'

describe('Navbar', () => {
  it('shows the Qavor project logo in the brand link', () => {
    const wrapper = mount(Navbar)

    const logo = wrapper.get('a[href="#top"] img[alt="Qavor 项目图标"]')
    expect(logo.attributes('src')).toMatch(/\/qavor-logo\.png$/)
  })
})
