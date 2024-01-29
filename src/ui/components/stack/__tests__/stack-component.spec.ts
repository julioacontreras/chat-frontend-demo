import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Stack from '../stack-component.vue'

describe('Stack', () => {
  it('exists', () => {
    const wrapper = mount(Stack, {})
    expect(wrapper).toBeTruthy()
  })
})
