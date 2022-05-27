/* eslint-disable max-statements */
/* eslint-disable no-magic-numbers */
/* eslint-disable @typescript-eslint/ban-types */
import { IsIdentical } from '../../../IsEqual'
import { Assert, Is } from '../../bdd'
import { getKeys, Key } from './getKeys'

describe('getKeys', () => {
	it('works - static', () => {
		expect.assertions(0)

		Assert(
			Is<Key<{}>>() //
				.identicalTo<never>(),

			Is<Key<{ a: 1; b: 2 }>>() //
				.identicalTo<'a' | 'b'>(),

			Is<Key<{ a: 1; b?: 2 }>>() //
				.identicalTo<'a' | 'b'>(),

			Is<Key<object>>() //
				.identicalTo<never>()
		)
	})

	it('works', () => {
		expect.hasAssertions()

		const sym = Symbol('sym')
		const sym2 = Symbol('sym2')

		const obj = { 1: 1, a: 'a', nonEnumerable: 123, [sym]: sym, [sym2]: sym2 }

		type K = Key<typeof obj>
		Assert<
			IsIdentical<K, 1 | 'a' | 'nonEnumerable' | typeof sym | typeof sym2>
		>()

		Object.defineProperty(obj, 'nonEnumerable', { enumerable: false })
		Object.defineProperty(obj, sym2, { enumerable: false })

		expect(Object.keys(obj)).toStrictEqual(['1', 'a'])

		const a = getKeys(obj)

		expect(a).toStrictEqual(['1', 'a', sym])

		type A = typeof a[number]
		Assert<
			IsIdentical<A, 1 | 'a' | 'nonEnumerable' | typeof sym | typeof sym2>
		>()
	})
})
