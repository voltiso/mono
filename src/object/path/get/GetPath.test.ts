/* eslint-disable no-magic-numbers */
/* eslint-disable max-statements */
/* eslint-disable @typescript-eslint/ban-types */
import { Assert } from '../../../bdd'
import { IsIdentical } from '../../../IsEqual'
import { GetPath } from './GetPath'

describe('GetPath', () => {
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

		// @ts-expect-error bad path
		type I = GetPath<{ a: { b: { c: 0 } } }, ['a', 'a']>
		Assert<IsIdentical<I, undefined>>()
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
})
