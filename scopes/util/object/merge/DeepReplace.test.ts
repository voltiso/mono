/* eslint-disable max-statements */
/* eslint-disable no-magic-numbers */
import { Assert } from '../../bdd'
import { IsEqual, IsIdentical, IsNonStrictEqual } from '../../../IsEqual'
import { DeepReplace2 } from './DeepReplace'

describe('DeepReplace', () => {
	it('works (static)', () => {
		expect.assertions(0)

		type A = DeepReplace2<string, number>
		Assert<IsIdentical<A, number>>()

		Assert<IsIdentical<DeepReplace2<{ a?: 1 }, string>, string>>()
		Assert<IsIdentical<DeepReplace2<string, { a?: 1 }>, { a?: 1 }>>()

		type B = DeepReplace2<{ a?: 1 }, { a?: 1; b?: 2 }>
		Assert<IsNonStrictEqual<B, { a?: 1; b?: 2 }>>()

		type C = {
			c: DeepReplace2<C, { c: 2 }>
		}
		Assert<IsEqual<C, { c: { c: 2 } }>>()

		type D = {
			c: DeepReplace2<C, { c: C }>
		}
		Assert<IsIdentical<D, { c: { c: C } }>>()

		Assert<
			IsIdentical<
				DeepReplace2<{ a: { a: 1 } }, { a: { b: 2 } }>,
				{ a: { a: 1; b: 2 } }
			>
		>()
	})
})
