// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '~/$strip'
import type { IsIdentical } from '~/type/compare/IsEqual'

import type { GetNested } from './getNested'
import { get } from './getNested'

describe('getNested', () => {
	it('works - static', () => {
		expect.assertions(0)

		type A = GetNested<{ a: { b: { c: 0 } } }, []>
		$Assert<IsIdentical<A, { a: { b: { c: 0 } } }>>()

		type B = GetNested<{ a: { b: { c: 0 } } }, ['a']>
		$Assert<IsIdentical<B, { b: { c: 0 } }>>()

		type C = GetNested<{ a: { b: { c: 0 } } }, ['a', 'b', 'c']>
		$Assert<IsIdentical<C, 0>>()

		type D = GetNested<{ a: { b: { c?: 0 } } }, ['a', 'b', 'c']>
		$Assert<IsIdentical<D, 0>>()

		type D2 = GetNested<{ a: { b: { c?: 0 | undefined } } }, ['a', 'b', 'c']>
		$Assert<IsIdentical<D2, 0 | undefined>>()

		type DD = GetNested<{}, []>
		$Assert<IsIdentical<DD, {}>>()

		type DDD = GetNested<{ a: 0 }, ['a']>
		$Assert<IsIdentical<DDD, 0>>()

		type E = GetNested<{ a: { b?: { c: 0 } } }, ['a', 'b', 'c']>
		$Assert<IsIdentical<E, 0>>()

		type F = GetNested<{ a: { b: { c: 0 | undefined } } }, ['a', 'b', 'c']>
		$Assert<IsIdentical<F, 0 | undefined>>()

		type G = GetNested<{ a?: { b: { c?: 0 } } }, ['a', 'b', 'c']>
		$Assert<IsIdentical<G, 0>>()

		// @ts-expect-error bad path
		type H = GetNested<{}, ['a', 'b', 'c']>
		$Assert<IsIdentical<H, never>>()

		// @ts-expect-error bad path
		type I = GetNested<{ a: { b: { c: 0 } } }, ['a', 'a']>
		$Assert<IsIdentical<I, never>>()
	})

	it('works - static - unions', () => {
		expect.assertions(0)

		type AA = GetNested<{ a: 1 }, []>
		$Assert<IsIdentical<AA, { a: 1 }>>()

		type BB = GetNested<{ a: 1 } | { b: 2 }, []>
		$Assert<IsIdentical<BB, { a: 1 } | { b: 2 }>>()

		type CC = GetNested<{ a: 1 } | { a: 2 }, ['a']>
		$Assert<IsIdentical<CC, 1 | 2>>()

		type DD = GetNested<{ a: 1 } | {}, ['a']>
		$Assert<IsIdentical<DD, 1>>()

		type A = GetNested<{ a: { b: 0 } } | { a: { b: 1 } }, ['a', 'b']>
		$Assert<IsIdentical<A, 0 | 1>>()

		type B = GetNested<{ a: { b: 0 } } | { a: { c: 1 } }, ['a', 'b']>
		$Assert<IsIdentical<B, 0>>()

		type C = GetNested<{ a: { b?: 0 } } | { a: { c: 1 } }, ['a', 'b']>
		$Assert<IsIdentical<C, 0>>()

		type D = GetNested<
			{ a: { b?: 0 | undefined } } | { a: { c: 1 } },
			['a', 'b']
		>
		$Assert<IsIdentical<D, 0 | undefined>>()
	})

	it('works', () => {
		expect.hasAssertions()

		expect(() => get({} as { a?: number }, 'a')).toThrow(
			`property not found @ get({}, ['a'])`,
		)
		expect(() =>
			get({ a: { b: 123 } } as { a?: { b: 123 | { c: 123 } } }, 'a', 'b', 'c'),
		).toThrow(`property not found @ get({ a: { b: 123 } }, ['a', 'b', 'c'])`)

		expect(get({ a: 0 })).toStrictEqual({ a: 0 })
		expect(get({ a: 0 }, 'a')).toBe(0)

		expect(get({ a: { b: { c: 0 } } }, 'a', 'b')).toStrictEqual({ c: 0 })

		// @ts-expect-error __proto__
		expect(() => get({ a: 1 }, '__proto__')).toThrow('pollution')

		// @ts-expect-error constructor
		expect(() => get({ a: 1 }, 'constructor')).toThrow('pollution')

		// @ts-expect-error constructor
		expect(() => get({ a: {} }, 'a', 'constructor')).toThrow('pollution')

		const a = { b: { c: { d: { e: 0 as const } } } }

		// @ts-expect-error path does not exist
		expect(() => get(a, 'a' as const)).toThrow('property not found')

		// @ts-expect-error path does not exist
		expect(() => get(a, ['a'] as const)).toThrow('property not found')

		const aaa = get(a, 'b' as const, 'c' as const, 'd' as const)
		const aaa2 = get(a, ['b', 'c', 'd'] as const)

		expect(aaa).toStrictEqual({ e: 0 })
		expect(aaa2).toStrictEqual({ e: 0 })

		$Assert<IsIdentical<typeof aaa, { e: 0 }>>()
		$Assert<IsIdentical<typeof aaa2, { e: 0 }>>()
	})
})
