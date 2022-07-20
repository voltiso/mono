// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsCompatible, IsIdentical } from '../../type/compare'
import { Assert } from '../../type/static-assert'
import type { Flatten, Flatten2 } from './Flatten.js'

describe('Flatten', () => {
	it('works', () => {
		expect.assertions(0)

		type A = Flatten<{ a: 1 } & { b?: 2 }>

		Assert.is<A, { a: 1; b?: 2 }>()
		Assert<IsIdentical<Flatten<{ a?: 1 }>, { a?: 1 }>>()
		Assert.is<IsIdentical<Flatten<{ a?: 1 | undefined }>, { a: 1 }>, false>()
		Assert.is<IsIdentical<Flatten<{ a: 1 | undefined }>, { a?: 1 }>, false>()

		Assert.is<
			IsIdentical<Flatten<{ a: 1 | undefined }>, { a?: 1 | undefined }>,
			false
		>()

		Assert<IsIdentical<Flatten<{ a: 1 | undefined }>, { a: 1 | undefined }>>()

		Assert.is<Flatten<number>, number>()
		Assert.is<Flatten<string>, string>()
		Assert.is<Flatten<Date>, Date>()
		Assert<IsIdentical<Flatten<typeof Date>, typeof Date>>()

		// type B = Flatten<{ a: 1 } | { a: 1; b: 2 }>
		// Assert<IsIdentical<B, { a: 1; b?: 2 }>>()

		type Rec = Rec[] | string
		Assert.is<Flatten<Rec>, Rec>()

		Assert<
			IsIdentical<
				Flatten<
					{
						a: { a: 1 }
					} & {
						a: { b: 2 }
					}
				>,
				{
					a: {
						a: 1
					} & {
						b: 2
					}
				}
			>
		>()

		Assert<
			IsIdentical<
				Flatten2<
					{
						a: { a?: 1 }
					} & {
						a?: { b: 2 }
					}
				>,
				{
					a: {
						a?: 1
						b: 2
					}
				}
			>
		>()

		Assert.is<
			IsIdentical<
				Flatten<
					{
						a: { a: 1 }
					} & {
						a: { b: 2 }
					}
				>,
				{
					a: {
						a: 1
						b: 2
					}
				}
			>,
			false
		>()
	})

	it('primitives', () => {
		expect.assertions(0)

		type N = Flatten<number>
		Assert<IsIdentical<N, number>>()

		type S = Flatten<string>
		Assert<IsIdentical<S, string>>()

		type B = Flatten<boolean>
		Assert<IsIdentical<B, boolean>>()
	})

	it('nullish', () => {
		expect.assertions(0)

		type Null = Flatten<null>
		Assert<IsIdentical<Null, null>>()

		type Undef = Flatten<undefined>
		Assert<IsIdentical<Undef, undefined>>()
	})

	it('nullish (generic)', <N extends null>() => {
		expect.assertions(0)

		type A = Flatten<N>
		Assert.is<A, null>()
	})

	it('TS types - unknown, ...', () => {
		expect.assertions(0)

		type U = Flatten<unknown>
		Assert<IsIdentical<U, unknown>>()

		type A = Flatten<any>
		Assert<IsIdentical<A, any>>()

		type N = Flatten<never>
		Assert<IsIdentical<N, never>>()

		type V = Flatten<void>
		Assert<IsIdentical<V, void>>()
	})

	it('object', () => {
		expect.assertions(0)

		type O = Flatten<object>
		Assert<IsIdentical<O, object>>()

		type OO = Flatten<{}>
		Assert<IsIdentical<OO, {}>>()

		type OOO = Flatten<Object>
		Assert<IsIdentical<OOO, Object>>()

		type OOOO = Flatten<Record<string, unknown>>
		Assert<IsIdentical<OOOO, Record<string, unknown>>>()
	})

	it('works with index signatures', () => {
		expect.assertions(0)

		type X = Flatten<{ [k: string]: 1 | 2; b: 2 } & { a: 1 }>
		Assert<IsIdentical<X, { [k: string]: 1 | 2; a: 1; b: 2 }>>()

		type A = Flatten<
			{ [k: string]: number; [k: number]: 2; [k: symbol]: 3 } & { a: 123 }
		>

		Assert<
			IsIdentical<
				A,
				{ [k: string]: number; [k: number]: 2; [k: symbol]: 3; a: 123 }
			>
		>()
	})

	it('works with construct signatures', () => {
		expect.assertions(0)

		type X = Flatten<new (n: number) => string>
		Assert<IsIdentical<X, new (n: number) => string>>()

		type XX = Flatten<(new (x: 22) => string) & { a?: 1 }>
		Assert<IsCompatible<XX, { new (x: 22): string; a?: 1 }>>()
	})

	it('works with generics (unknown)', <X>() => {
		expect.assertions(0)

		Assert.is<Flatten<X>, X>()
	})

	it('works with generics (string)', <X extends string>() => {
		expect.assertions(0)

		type Y = Flatten<X>
		Assert.is<Y, X>()
	})

	it('readonly', () => {
		expect.assertions(0)

		type A = Flatten<{ readonly a: 1 }>
		Assert<IsIdentical<A, { readonly a: 1 }>>()

		type B = Flatten<{ readonly a: 1 } & { readonly b: 2 }>
		Assert<IsIdentical<B, { readonly a: 1; readonly b: 2 }>>()
	})
})
