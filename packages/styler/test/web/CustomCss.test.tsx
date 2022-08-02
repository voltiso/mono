// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { undef } from '@voltiso/util'

import { style } from '~'

describe('CustomCss', () => {
	it('works (static)', () => {
		expect.assertions(0)

		const Div = style('div')

		;() => (
			<Div
				css={{
					animationDuration: undef,
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

					animationDuration: undef,
				}}
			/>
		)
	})
})
