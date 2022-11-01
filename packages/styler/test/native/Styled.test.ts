// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical, StaticError } from '@voltiso/util'
import { $Assert } from '@voltiso/util'
import type { StyleProp } from 'react-native'

import type {
	GetStyledComponent,
	IStyled,
	IStyledComponent,
	Stylable,
	StyledComponent,
	StyledComponentWithProps,
} from '~'
import { style } from '~'

describe('Styled (react-native)', () => {
	it('generic', <P extends {}, C extends Stylable>() => {
		expect.assertions(0)

		$Assert.is<GetStyledComponent<{ Props: P }>, IStyled | StaticError>()
		$Assert.is<
			GetStyledComponent<{ Props: P }>,
			IStyledComponent | StaticError
		>()

		$Assert.is<StyledComponentWithProps<C, P>, IStyled>()
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

		$Assert<IsIdentical<A, StyledComponent<typeof GoodComponent>>>()

		//

		//

		const HardGood = (_props: { a: 1; style?: StyleProp<unknown> }) => null
		const b = style(HardGood)
		type B = typeof b
		$Assert<IsIdentical<B, StyledComponent<typeof HardGood>>>()
	})
})
