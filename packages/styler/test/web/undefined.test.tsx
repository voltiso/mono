// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { style } from '~'

describe('undefined', () => {
	it('works (static)', () => {
		expect.assertions(0)

		const Div = style('div')

		;() => (
			<Div
				css={{
					animationDuration: undefined,
				}}
			/>
		)

		// adding animationName messes Fela typings?
		;() => (
			<Div
				css={{
					animationName: {
						from: { margin: 0 },
					},

					animationDuration: undefined,
				}}
			/>
		)
	})
})
