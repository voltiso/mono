/* eslint-disable max-statements */
/* eslint-disable no-magic-numbers */
/* eslint-disable @typescript-eslint/ban-types */
import { IsIdentical } from '../../misc/IsEqual'
import { Assert } from '../../bdd'
import { PartialIfNullish } from './PartialIfNullish'

describe('PartialIfNullish', () => {
	it('works', () => {
		expect.assertions(0)

		type A = PartialIfNullish<null>
		Assert<IsIdentical<A, {}>>()

		type B = PartialIfNullish<undefined>
		Assert<IsIdentical<B, {}>>()

		type C = PartialIfNullish<{ a: 1 }>
		Assert<IsIdentical<C, { a: 1 }>>()

		type D = PartialIfNullish<{ a: 1 } | null>
		Assert<IsIdentical<D, { a?: 1 }>>()

		type E = PartialIfNullish<{ a: 1 } | null | undefined>
		Assert<IsIdentical<E, { a?: 1 }>>()
	})

	it('generics', <T extends { a?: 1 }>() => {
		expect.assertions(0)

		type A = PartialIfNullish<T>
		Assert.is<A, { a?: 1 }>()
	})
})
