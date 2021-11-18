import { shallowMount } from '@vue/test-utils'
import CreateProfile from '@/components/CreateProfile.vue'

describe('CreateProfile.vue Test', () => {
  it('Updates an account with a new profile', () => {
    
    const wrapper = shallowMount(CreateProfile, {
      props: {}
    })
    // This is the name of "export default"
    expect(wrapper.vm.$options.name).toMatch('CreateProfile')
  })
})
