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
		).toBe(`E0_t8Q o2uo_w`)
		// ).toBe(`_0 _1`)

		expect(renderer.flushStyle()).toBe(
			// `._0{background-color:blue}._1{color:red}`,
			`.E0_t8Q{color:red}.o2uo_w{background-color:blue}`,
		)
	})

	it('media query', () => {
		const renderer = new WebRenderer()

		expect(
			renderer.classNameFor({
				_: {
					color: 'red',

					'@media (min-width: 100px)': {
						color: 'blue',
					},
				},
			}),
		).toBe(`xaKNiQ`)
		// ).toBe(`_0`)

		expect(renderer.flushStyle()).toBe(
			// `@media (min-width: 100px){._0{color:blue}}._0{color:red}`,
			`.xaKNiQ{color:red}@media (min-width: 100px){.xaKNiQ{color:blue}}`,
		)

		renderer.unflushStyle()

		expect(renderer.flushStyle()).toBe(
			// `@media (min-width: 100px){._0{color:blue}}._0{color:red}`,
			`.xaKNiQ{color:red}@media (min-width: 100px){.xaKNiQ{color:blue}}`,
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
		).toBe(`QC-aKA`)
		// ).toBe(`_0`)

		expect(renderer.flushStyle()).toBe(
			// `@keyframes _0{0%{background-color:red}100%{background-color:blue}}._0{animation-name:_0}`,
			/* cspell:disable-next-line */
			`@keyframes KhzrqQ{0%{background-color:red}100%{background-color:blue}}.QC-aKA{animation-name:KhzrqQ}`,
		)

		renderer.unflushStyle()

		expect(renderer.flushStyle()).toBe(
			// `._0{animation-name:_0}@keyframes _0{0%{background-color:red}100%{background-color:blue}}`,
			/* cspell:disable-next-line */
			`.QC-aKA{animation-name:KhzrqQ}@keyframes KhzrqQ{0%{background-color:red}100%{background-color:blue}}`,
		)
	})

	it('flatten media query - preserves order', () => {
		const renderer = new WebRenderer()

		expect(
			renderer.classNameFor({
				color: 'red',

				_: {
					'@media (min-width: 100px)': {
						color: 'blue',
					},
				},
			}),
		).toBe(`xaKNiQ`)

		expect(renderer.flushStyle()).toBe(
			'.xaKNiQ{color:red}@media (min-width: 100px){.xaKNiQ{color:blue}}',
		)

		renderer.unflushStyle()

		expect(renderer.flushStyle()).toBe(
			'.xaKNiQ{color:red}@media (min-width: 100px){.xaKNiQ{color:blue}}',
		)
	})
})
