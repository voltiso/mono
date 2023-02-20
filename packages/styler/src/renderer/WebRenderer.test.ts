// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { WebRenderer } from './WebRenderer'

describe('WebRenderer', () => {
	it('simple', () => {
		const renderer = new WebRenderer()

		expect(
			renderer.classNameFor({
				_: {
					color: 'red',
				},

				backgroundColor: 'blue',
			}),
		).toBe(`_0 _1`)
		// ).toBe(`o2uo_w E0_t8Q`)

		expect(renderer.flushStyle()).toBe(
			`._0{background-color:blue}._1{color:red}`,
			// `.o2uo_w{background-color:blue}.E0_t8Q{color:red}`,
		)
	})

	it('animationName', () => {
		const renderer = new WebRenderer()

		expect(
			renderer.classNameFor({
				animationName: {
					'0%': {
						backgroundColor: 'red',
					},

					'100%': {
						backgroundColor: 'blue',
					},
				},
			} as never),
		).toBe(`_0`)
		// ).toBe(`QC-aKA`)

		expect(renderer.flushStyle()).toBe(
			`@keyframes _0{0%{background-color:red}100%{background-color:blue}}._0{animation-name:_0}`,
			/* cspell:disable-next-line */
			// `@keyframes KhzrqQ{0%{background-color:red}100%{background-color:blue}}.QC-aKA{animation-name:KhzrqQ}`,
		)

		renderer.unflushStyle()

		expect(renderer.flushStyle()).toBe(
			`._0{animation-name:_0}@keyframes _0{0%{background-color:red}100%{background-color:blue}}`,
			/* cspell:disable-next-line */
			// `.QC-aKA{animation-name:KhzrqQ}@keyframes KhzrqQ{0%{background-color:red}100%{background-color:blue}}`,
		)
	})
})
