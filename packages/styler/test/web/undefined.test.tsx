// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
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
