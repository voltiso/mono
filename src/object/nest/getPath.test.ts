/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-statements */
/* eslint-disable no-undefined */
import { Assert } from '../../bdd'
import { IsIdentical } from '../../IsEqual'
import { getPath, GetPath } from './getPath'

describe('getPath', () => {
	it('works (static)', () => {
		expect.assertions(0)

		type A = GetPath<{ a: { b: { c: 0 } } }, []>
		Assert<IsIdentical<A, { a: { b: { c: 0 } } }>>()

		type B = GetPath<{ a: { b: { c: 0 } } }, ['a']>
		Assert<IsIdentical<B, { b: { c: 0 } }>>()

		type C = GetPath<{ a: { b: { c: 0 } } }, ['a', 'b', 'c']>
		Assert<IsIdentical<C, 0>>()

		type D = GetPath<{ a: { b: { c?: 0 } } }, ['a', 'b', 'c']>
		Assert<IsIdentical<D, 0 | undefined>>()

		type DD = GetPath<{} | undefined, []>
		Assert<IsIdentical<DD, {} | undefined>>()

		type DDD = GetPath<{ a: 0 } | undefined, ['a']>
		Assert<IsIdentical<DDD, 0 | undefined>>()

		type E = GetPath<{ a: { b?: { c: 0 } } }, ['a', 'b', 'c']>
		Assert<IsIdentical<E, 0 | undefined>>()

		type F = GetPath<undefined | { a: { b: { c: 0 } } }, ['a', 'b', 'c']>
		Assert<IsIdentical<F, 0 | undefined>>()

		type G = GetPath<{ a?: { b: { c: 0 } } }, ['a', 'b', 'c']>
		Assert<IsIdentical<G, 0 | undefined>>()

		// @ts-expect-error bad path
		type H = GetPath<{}, ['a', 'b', 'c']>
		Assert<IsIdentical<H, undefined>>()
	})

	it('works (static) - unions', () => {
		expect.assertions(0)

		type A = GetPath<{ a: { b: 0 } } | { a: { b: 1 } }, ['a', 'b']>
		Assert<IsIdentical<A, 0 | 1>>()

		type B = GetPath<{ a: { b: 0 } } | { a: { c: 1 } }, ['a', 'b']>
		Assert<IsIdentical<B, 0 | undefined>>()

		type C = GetPath<undefined | { a: { b: 0 } } | { a: { c: 1 } }, ['a', 'b']>
		Assert<IsIdentical<C, 0 | undefined>>()
	})

	it('works', () => {
		expect.hasAssertions()

		expect(getPath(undefined as undefined | { a: number }, ['a'])).toBeUndefined()

		expect(
			getPath(
				{ a: {} } as
					| undefined
					| {
							a?: { b?: { c?: number } }
					  },
				['a', 'b', 'c']
			)
		).toBeUndefined()

		expect(getPath({ a: 0 }, [])).toStrictEqual({ a: 0 })
		expect(getPath({ a: 0 }, ['a'])).toBe(0)

		expect(getPath({ a: { b: { c: 0 } } }, ['a', 'b'])).toStrictEqual({ c: 0 })

		// @ts-expect-error __proto__
		expect(() => getPath({ a: 1 }, ['__proto__'])).toThrow('pollution')

		// @ts-expect-error constructor
		expect(() => getPath({ a: 1 }, ['constructor'])).toThrow('pollution')
	})
})
