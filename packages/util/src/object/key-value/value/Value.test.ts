// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '_'

import type { IsIdentical } from '~/type'

import type { Value } from './Value'

describe('value', () => {
	it('type', () => {
		expect.assertions(0)

		$Assert<IsIdentical<Value<{ a: number }, 'a'>, number>>()
		$Assert<IsIdentical<Value<{ a?: number }, 'a'>, number>>()

		$Assert<
			IsIdentical<Value<{ a: number | undefined }, 'a'>, number | undefined>
		>()

		$Assert<
			IsIdentical<Value<{ a?: number | undefined }, 'a'>, number | undefined>
		>()

		//

		$Assert<
			IsIdentical<Value<{ a: number | undefined }, 'a'>, number | undefined>
		>()

		$Assert<
			IsIdentical<Value<{ a?: number | undefined }, 'a'>, number | undefined>
		>()

		$Assert<IsIdentical<Value<{ a: 1 } | { a: 2 }, 'a'>, 1 | 2>>()

		type A = Value<{ a: 1 } | { a?: 2 }, 'a'>
		$Assert<IsIdentical<A, 1 | 2>>()

		type B = Value<{ a?: 1 } | { a?: 2 }, 'a'>
		$Assert<IsIdentical<B, 1 | 2>>()

		type C = Value<{ a: 1 } | {}, 'a'>
		$Assert<IsIdentical<C, 1>>()

		type D = Value<{ a: 1 } | {}, 'nonExisting'>
		$Assert<IsIdentical<D, never>>()
	})

	it('generics', <T extends { a?: 1 }>() => {
		expect.assertions(0)

		type A = Value<T, 'a'>
		$Assert.is<A, 1>()

		// type B = Value<T & object, keyof T>
		// type BB = B extends undefined ? true : false
		// Assert.is<BB, true>()
	})
})
