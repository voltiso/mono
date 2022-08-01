// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '~/type'
import { Assert } from '~/type'

import type { Value_ } from './Value'

describe('value', () => {
	it('type', () => {
		expect.assertions(0)

		Assert<IsIdentical<Value_<{ a: number }, 'a'>, number>>()
		Assert<IsIdentical<Value_<{ a?: number }, 'a'>, number>>()

		Assert<
			IsIdentical<Value_<{ a: number | undefined }, 'a'>, number | undefined>
		>()
		Assert<
			IsIdentical<Value_<{ a?: number | undefined }, 'a'>, number | undefined>
		>()

		Assert<IsIdentical<Value_<{ a: 1 } | { a: 2 }, 'a'>, 1 | 2>>()

		type A = Value_<{ a: 1 } | { a?: 2 }, 'a'>
		Assert<IsIdentical<A, 1 | 2>>()

		type B = Value_<{ a?: 1 } | { a?: 2 }, 'a'>
		Assert<IsIdentical<B, 1 | 2>>()

		type C = Value_<{ a: 1 } | {}, 'a'>
		Assert<IsIdentical<C, 1>>()

		type D = Value_<{ a: 1 } | {}, 'nonExisting'>
		Assert<IsIdentical<D, never>>()
	})

	it('generics', <T extends { a?: 1 }>() => {
		expect.assertions(0)

		type A = Value_<T, 'a'>
		Assert.is<A, 1>()

		// type B = Value<T & object, keyof T>
		// type BB = B extends undefined ? true : false
		// Assert.is<BB, true>()
	})
})
