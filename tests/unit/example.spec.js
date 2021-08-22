import { mount } from '@vue/test-utils'
import station from '@/components/station.vue'

describe('station.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = mount(station, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
