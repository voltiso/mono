/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable max-statements */
/* eslint-disable no-magic-numbers */
import { Assert } from '../../bdd'
import { IsIdentical } from '../../../IsEqual'
import { Value } from './Value'

describe('value', () => {
	it('works (static)', () => {
		expect.assertions(0)

		Assert<IsIdentical<Value<{ a: number }, 'a'>, number>>()
		Assert<IsIdentical<Value<{ a?: number }, 'a'>, number>>()

		Assert<
			IsIdentical<Value<{ a: number | undefined }, 'a'>, number | undefined>
		>()
		Assert<
			IsIdentical<Value<{ a?: number | undefined }, 'a'>, number | undefined>
		>()

		Assert<IsIdentical<Value<{ a: 1 } | { a: 2 }, 'a'>, 1 | 2>>()

		type A = Value<{ a: 1 } | { a?: 2 }, 'a'>
		Assert<IsIdentical<A, 1 | 2>>()

		type B = Value<{ a?: 1 } | { a?: 2 }, 'a'>
		Assert<IsIdentical<B, 1 | 2>>()

		type C = Value<{ a: 1 } | {}, 'a'>
		Assert<IsIdentical<C, 1>>()

		type D = Value<{ a: 1 } | {}, 'nonExisting'>
		Assert<IsIdentical<D, never>>()
	})

	it('generics', <T extends { a?: 1 }>() => {
		expect.assertions(0)

		type A = Value<T, 'a'>
		Assert.is<A, 1>()
	})
})
