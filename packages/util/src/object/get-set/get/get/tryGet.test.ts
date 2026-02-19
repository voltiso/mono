// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '_'
import { describe, expect, it } from '@jest/globals'

import type { IsIdentical } from '~/type'

import type { TryGet } from './tryGet'
import { tryGet } from './tryGet'

describe('get', () => {
	it('type', () => {
		expect.assertions(0)

		type A = TryGet<{ a: { b: { c: 0 } } }, []>
		$Assert<IsIdentical<A, { a: { b: { c: 0 } } }>>()

		type B = TryGet<{ a: { b: { c: 0 } } }, ['a']>
		$Assert<IsIdentical<B, { b: { c: 0 } }>>()

		type C = TryGet<{ a: { b: { c: 0 } } }, ['a', 'b', 'c']>
		$Assert<IsIdentical<C, 0>>()

		type D = TryGet<{ a: { b: { c?: 0 } } }, ['a', 'b', 'c']>
		$Assert<IsIdentical<D, 0 | undefined>>()

		type DD = TryGet<{} | undefined, []>
		$Assert<IsIdentical<DD, {} | undefined>>()

		type DDD = TryGet<{ a: 0 } | undefined, ['a']>
		$Assert<IsIdentical<DDD, 0 | undefined>>()

		type E = TryGet<{ a: { b?: { c: 0 } } }, ['a', 'b', 'c']>
		$Assert<IsIdentical<E, 0 | undefined>>()

		type F = TryGet<undefined | { a: { b: { c: 0 } } }, ['a', 'b', 'c']>
		$Assert<IsIdentical<F, 0 | undefined>>()

		type G = TryGet<{ a?: { b: { c: 0 } } }, ['a', 'b', 'c']>
		$Assert<IsIdentical<G, 0 | undefined>>()

		// @ts-expect-error bad path
		type H = TryGet<{}, ['a', 'b', 'c']>
		$Assert<IsIdentical<H, undefined>>()

		// @ts-expect-error bad path
		type I = TryGet<{ a: { b: { c: 0 } } }, ['a', 'a']>
		$Assert<IsIdentical<I, undefined>>()
	})

	it('type - indexed', () => {
		expect.assertions(0)

		type A = TryGet<{ [k: string]: 0 }, [string]>
		$Assert<IsIdentical<A, 0 | undefined>>()

		type B = TryGet<{ [k: string]: 0 }, ['test']>
		$Assert<IsIdentical<B, 0 | undefined>>()

		// @ts-expect-error no property `test`
		type C = TryGet<{ a: 1 }, ['test']>
		$Assert<IsIdentical<C, undefined>>()

		type D = TryGet<{ [k: string]: number; test: 0 }, ['test']>
		$Assert<IsIdentical<D, 0>>()

		type E = TryGet<{ [k: string]: number; test?: 0 }, ['test']>
		$Assert<IsIdentical<E, 0 | undefined>>()
	})

	it('type - unions', () => {
		expect.assertions(0)

		type A = TryGet<{ a: { b: 0 } } | { a: { b: 1 } }, ['a', 'b']>
		$Assert<IsIdentical<A, 0 | 1>>()

		type B = TryGet<{ a: { b: 0 } } | { a: { c: 1 } }, ['a', 'b']>
		$Assert<IsIdentical<B, 0 | undefined>>()

		type C = TryGet<undefined | { a: { b: 0 } } | { a: { c: 1 } }, ['a', 'b']>
		$Assert<IsIdentical<C, 0 | undefined>>()
	})

	it('works', () => {
		expect.hasAssertions()

		expect(tryGet(undefined as undefined | { a: number }, 'a')).toBeUndefined()

		expect(
			tryGet(
				{ a: {} } as
					| undefined
					| {
							a?: { b?: { c?: number } }
					  },
				'a',
				'b',
				'c',
			),
		).toBeUndefined()

		expect(tryGet({ a: 0 })).toStrictEqual({ a: 0 })
		expect(tryGet({ a: 0 }, 'a')).toBe(0)

		expect(tryGet({ a: { b: { c: 0 } } }, 'a', 'b')).toStrictEqual({ c: 0 })

		// @ts-expect-error __proto__
		expect(() => tryGet({ a: 1 }, '__proto__')).toThrow('pollution')

		// @ts-expect-error constructor
		expect(() => tryGet({ a: 1 }, 'constructor')).toThrow('pollution')

		// @ts-expect-error constructor
		expect(() => tryGet({ a: 1 }, 'a', 'constructor')).toThrow('pollution')

		const a = { b: { c: { d: { e: 0 as const } } } }
		// @ts-expect-error path does not exist
		const aa = tryGet(a, 'a' as const)
		// @ts-expect-error path does not exist
		const aa2 = tryGet(a, ['a'] as const)

		// eslint-disable-next-line jest/no-unnecessary-assertion
		expect(aa).toBeUndefined()
		// eslint-disable-next-line jest/no-unnecessary-assertion
		expect(aa2).toBeUndefined()

		const aaa = tryGet(a, 'b' as const, 'c' as const, 'd' as const)
		const aaa2 = tryGet(a, ['b', 'c', 'd'] as const)

		expect(aaa).toStrictEqual({ e: 0 })
		expect(aaa2).toStrictEqual({ e: 0 })

		$Assert<IsIdentical<typeof aaa, { e: 0 }>>()
		$Assert<IsIdentical<typeof aaa2, { e: 0 }>>()
	})
})
