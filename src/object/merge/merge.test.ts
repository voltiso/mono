/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-magic-numbers */
/* eslint-disable @typescript-eslint/ban-types */
import { Assert } from '../../bdd'
import { IsIdentical } from '../../IsEqual'
import { merge, Merge, Merge2, MergeN } from './merge'

describe('merge', () => {
	it('works with functions', () => {
		expect.assertions(0)
		const f = merge(() => 1, { b: 2 } as const)
		Assert.is<typeof f, () => 1>()
		Assert.is<typeof f, { b: 2 }>()
	})

	it('works with call signatures', () => {
		expect.assertions(0)
		type X = {
			(a: 1): 2
			b: 99
		}

		type R = Merge<X, { b: 2 }>
		Assert.is<R, { (a: 1): 2; b: 2 }>()

		type S = Merge<{ b: 2 }, X>
		Assert.is<S, { (a: 1): 2; b: 99 }>()
	})

	it('works', () => {
		expect.hasAssertions()

		// @ts-expect-error either array or individual args
		type _X = Merge<[{ a: 1 }], { b: 2 }>

		Assert<
			IsIdentical<Merge<[]>, {}>,
			IsIdentical<Merge<[{ a: 1 }]>, { a: 1 }>,
			IsIdentical<Merge<[{ a: 1 }, { b: 2 }]>, { a: 1; b: 2 }>,
			IsIdentical<Merge<[{ a: 1 }, { a: 2 }]>, { a: 2 }>,
			IsIdentical<Merge<[{ a: { a: 1 } }, { a: { b: 2 } }]>, { a: { b: 2 } }>,
			IsIdentical<Merge<[{ a: 1 }, { b: 2 }, { c: 3 }]>, { a: 1; b: 2; c: 3 }>,
			IsIdentical<Merge<{ a: 1 }>, { a: 1 }>,
			IsIdentical<Merge<{ a: 1 }, { b: 2 }>, { a: 1; b: 2 }>,
			IsIdentical<Merge<{ a: 1 }, { a: 2 }>, { a: 2 }>,
			IsIdentical<Merge<{ a: { a: 1 } }, { a: { b: 2 } }>, { a: { b: 2 } }>,
			IsIdentical<Merge<{ a: 1 }, { b: 2 }, { c: 3 }>, { a: 1; b: 2; c: 3 }>
		>()

		type II = Merge2<
			{
				a: 1
			},
			{
				a: 2
				readonly b?: 2
			}
		>

		Assert<IsIdentical<II, { a: 2; readonly b?: 2 }>>()

		const aa = merge(
			{
				a: 1,
				b: 2,
				d: { dd: 4 },
			} as const,
			{
				b: { bb: 2 },
				c: 3,
				d: { ddd: 5 },
			} as const
		)

		expect(aa).toStrictEqual({
			a: 1,
			b: { bb: 2 },
			c: 3,
			d: { ddd: 5 },
		})

		Assert<
			IsIdentical<
				typeof aa,
				{
					readonly a: 1
					readonly b: { readonly bb: 2 }
					readonly c: 3
					readonly d: { readonly ddd: 5 }
				}
			>
		>()
	})

	it('Merge2 - optional (static)', () => {
		expect.assertions(0)

		type A = Merge2<{ a?: 1 }, { a?: 2 }>
		Assert<IsIdentical<A, { a?: 1 | 2 }>>()

		type B = Merge2<{ a: 1 }, { a?: 2 }>
		Assert<IsIdentical<B, { a: 1 | 2 }>>()

		type C = Merge2<{ a: 1 }, { a: 2 }>
		Assert<IsIdentical<C, { a: 2 }>>()

		type D = Merge2<{ a?: 1 }, { a: 2 }>
		Assert<IsIdentical<D, { a: 2 }>>()
	})

	it('MergeN - optional (static)', () => {
		expect.assertions(0)

		type A = MergeN<[{ a?: 1 }, { a?: 2 }]>
		Assert<IsIdentical<A, { a?: 1 | 2 }>>()

		type B = MergeN<[{ a: 1 }, { a?: 2 }]>
		Assert<IsIdentical<B, { a: 1 | 2 }>>()

		type C = MergeN<[{ a: 1 }, { a: 2 }]>
		Assert<IsIdentical<C, { a: 2 }>>()

		type D = MergeN<[{ a?: 1 }, { a: 2 }]>
		Assert<IsIdentical<D, { a: 2 }>>()
	})
})
