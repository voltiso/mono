// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { Assert } from '@voltiso/util'
import type { StyleProp } from 'react-native'

import type { Props, Stylable, Styled, StyledComponent } from '~'
import { style } from '~'

describe('Styled (react-native)', () => {
	it('generic', <P extends Props, C extends Stylable>() => {
		expect.assertions(0)

		Assert.is<StyledComponent<P>, Styled>()
		Assert.is<StyledComponent<P>, StyledComponent>()

		Assert.is<Styled<P, C>, Styled>()
	})

	it('does not allow components without InnerProps', () => {
		expect.assertions(0)

		const BadComponent = (_props: { a?: 1 }) => null

		// @ts-expect-error no properties in common
		const _c = style(BadComponent)

		//

		//

		const GoodComponent = (_props: { a?: 1; style?: StyleProp<unknown> }) =>
			null

		const a = style(GoodComponent)
		type A = typeof a

		Assert<
			IsIdentical<
				A,
				StyledComponent<{
					a?: 1
					style?: unknown
				}>
			>
		>()

		//

		//

		const HardGood = (_props: { a: 1; style?: StyleProp<unknown> }) => null
		const b = style(HardGood)
		type B = typeof b
		Assert<
			IsIdentical<B, StyledComponent<{ a: 1; style?: StyleProp<unknown> }>>
		>()
	})
})
