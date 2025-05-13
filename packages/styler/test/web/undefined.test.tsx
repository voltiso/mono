// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'

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
