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

		expect(renderer.flushStyle()).toBe(
			`._0{background-color:blue}._1{color:red}`,
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

		expect(renderer.flushStyle()).toBe(
			`@keyframes _0{0%{background-color:red}100%{background-color:blue}}._0{animation-name:_0}`,
		)

		renderer.unflushStyle()

		expect(renderer.flushStyle()).toBe(
			`._0{animation-name:_0}@keyframes _0{0%{background-color:red}100%{background-color:blue}}`,
		)
	})
})
