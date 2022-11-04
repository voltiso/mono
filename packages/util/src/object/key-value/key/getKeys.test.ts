// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '~/$strip'
import type { IsIdentical } from '~/type'

import { getKeys } from './getKeys'

describe('getKeys', () => {
	it('works', () => {
		expect.hasAssertions()

		const sym = Symbol('sym')
		const sym2 = Symbol('sym2')

		const obj = {
			1: 1 as const,
			a: 'a' as const,
			nonEnumerable: 123 as const,
			[sym]: sym,
			[sym2]: sym2,
		}

		Object.defineProperty(obj, 'nonEnumerable', { enumerable: false })
		Object.defineProperty(obj, sym2, { enumerable: false })

		expect(Object.keys(obj)).toStrictEqual(['1', 'a'])

		const a = getKeys(obj, { includeSymbols: true })

		expect(a).toStrictEqual(['1', 'a', sym])

		type A = typeof a[number]
		$Assert<
			IsIdentical<A, '1' | 'a' | 'nonEnumerable' | typeof sym | typeof sym2>
		>()

		const b = getKeys(obj)

		expect(b).toStrictEqual(['1', 'a'])

		type B = typeof b[number]
		$Assert<IsIdentical<B, '1' | 'a' | 'nonEnumerable'>>()

		const c = getKeys(obj, { includeNonEnumerable: true })

		expect(c).toStrictEqual(['1', 'a', 'nonEnumerable'])

		type C = typeof c[number]
		$Assert<IsIdentical<C, '1' | 'a' | 'nonEnumerable'>>()

		const d = getKeys(obj, {
			includeNonEnumerable: true,
			includeSymbols: true,
		})

		expect(d).toStrictEqual(['1', 'a', 'nonEnumerable', sym, sym2])

		type D = typeof d[number]
		$Assert<
			IsIdentical<D, '1' | 'a' | 'nonEnumerable' | typeof sym | typeof sym2>
		>()
	})
})
