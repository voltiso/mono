// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '_'

import type { PartialIfNullish } from '~/object'
import type { IsIdentical } from '~/type'

describe('PartialIfNullish', () => {
	it('works', () => {
		expect.assertions(0)

		type A = PartialIfNullish<null>
		$Assert<IsIdentical<A, {}>>()

		type B = PartialIfNullish<undefined>
		$Assert<IsIdentical<B, {}>>()

		type C = PartialIfNullish<{ a: 1 }>
		$Assert<IsIdentical<C, { a: 1 }>>()

		type D = PartialIfNullish<{ a: 1 } | null>
		$Assert<IsIdentical<D, { a?: 1 }>>()

		type E = PartialIfNullish<{ a: 1 } | null | undefined>
		$Assert<IsIdentical<E, { a?: 1 }>>()
	})

	it('generics', <T extends { a?: 1 }>() => {
		expect.assertions(0)

		type A = PartialIfNullish<T>
		$Assert.is<A, { a?: 1 }>()
	})
})
