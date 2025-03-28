import { describe, expect, it, vi } from 'vitest'
import { ref, defineComponent } from 'vue'
import { mount } from '@vue/test-utils'
import useEventListener from '../useEventListener'

describe('hooks/useEventListener', () => {
	it('should add or remove event listener when target is HtMLElement', async () => {
		const target = document.createElement('button')
		const handler = vi.fn()
		const wrapper = mount(
			defineComponent({
				setup() {
					useEventListener(target, 'click', handler)
					return () => <div id="container"></div>
				}
			})
		)
		wrapper.get('#container').element.appendChild(target)

		await target.click()
		expect(handler).toHaveBeenCalledOnce()

		await wrapper.unmount()
		await target.click()
		expect(handler).toHaveBeenCalledOnce()
	})

	it('should add or remove event listener when target is Ref<HtmlElement>', async () => {
		const target = ref<HTMLElement | void>()
		const handler = vi.fn()
		mount(
			defineComponent({
				setup() {
					useEventListener(target, 'click', handler)
					return () => <button ref={target}></button>
				}
			})
		)

		await document.getElementById('container')?.click()
		await target.value?.click()
		expect(handler).toHaveBeenCalledOnce()

		target.value = document.createElement('div')
		await document.getElementById('container')?.click()
		expect(handler).toHaveBeenCalledOnce()
	})
})
