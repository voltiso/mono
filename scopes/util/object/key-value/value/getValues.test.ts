/* eslint-disable max-statements */
/* eslint-disable no-magic-numbers */
/* eslint-disable @typescript-eslint/ban-types */
import { IsIdentical } from '../../../../IsEqual'
import { Assert } from '../../../bdd'
import { getValues } from './getValues'
import { Value } from './Value'

describe('getValues', () => {
	it('works', () => {
		expect.hasAssertions()

		const sym = Symbol('sym')
		const sym2 = Symbol('sym2')

		const obj = {
			1: 1,
			a: 'a',
			nonEnumerable: 123,
			[sym]: sym,
			[sym2]: sym2,
		} as const

		type V = Value<typeof obj>
		Assert<IsIdentical<V, 1 | 'a' | 123 | typeof sym | typeof sym2>>()

		Object.defineProperty(obj, 'nonEnumerable', { enumerable: false })
		Object.defineProperty(obj, sym2, { enumerable: false })

		expect(Object.keys(obj)).toStrictEqual(['1', 'a'])

		const a = getValues(obj, { includeSymbols: true })
		expect(a).toStrictEqual([1, 'a', sym])
		type A = typeof a[number]
		Assert<IsIdentical<A, 1 | 'a' | 123 | typeof sym | typeof sym2>>()

		const b = getValues(obj)
		expect(b).toStrictEqual([1, 'a'])
		type B = typeof b[number]
		Assert<IsIdentical<B, 1 | 'a' | 123>>() // no way to type-check if enumerable

		const c = getValues(obj, { includeNonEnumerable: true })
		expect(c).toStrictEqual([1, 'a', 123])
		Assert<IsIdentical<typeof c[number], 1 | 'a' | 123>>()

		const d = getValues(obj, {
			includeNonEnumerable: true,
			includeSymbols: true,
		})
		expect(d).toStrictEqual([1, 'a', 123, sym, sym2])
		type D = typeof d[number]
		Assert<IsIdentical<D, 1 | 'a' | 123 | typeof sym | typeof sym2>>()
	})
})
