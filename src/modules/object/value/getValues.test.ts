/* eslint-disable max-statements */
/* eslint-disable no-magic-numbers */
/* eslint-disable @typescript-eslint/ban-types */
import { IsIdentical } from '../../../IsEqual'
import { Assert } from '../../bdd'
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

		const a = getValues(obj)

		expect(a).toStrictEqual([1, 'a', sym])

		type A = typeof a[number]
		Assert<IsIdentical<A, 1 | 'a' | 123 | typeof sym | typeof sym2>>()
	})
})
