// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '_'
import { describe, expect, it } from '@jest/globals'

import type { IsIdentical } from '~/type'

import type { $_, $__ } from './DistributedFlatten'

describe('$_ (DistributedFlatten)', () => {
	it('works', () => {
		expect.assertions(0)

		type A = $_<{ a: 1 } & { b?: 2 }>

		$Assert.is<A, { a: 1; b?: 2 }>()
		$Assert<IsIdentical<$_<{ a?: 1 }>, { a?: 1 }>>()
		$Assert.is<IsIdentical<$_<{ a?: 1 | undefined }>, { a: 1 }>, false>()
		$Assert.is<IsIdentical<$_<{ a: 1 | undefined }>, { a?: 1 }>, false>()

		$Assert.is<
			IsIdentical<$_<{ a: 1 | undefined }>, { a?: 1 | undefined }>,
			false
		>()

		$Assert<IsIdentical<$_<{ a: 1 | undefined }>, { a: 1 | undefined }>>()

		$Assert.is<$_<number>, number>()
		$Assert.is<$_<string>, string>()
		$Assert.is<$_<Date>, Date>()

		// type B = $_<{ a: 1 } | { a: 1; b: 2 }>
		// Assert<IsIdentical<B, { a: 1; b?: 2 }>>()

		type Rec = Rec[] | string
		$Assert.is<$_<Rec>, Rec>()

		$Assert<
			IsIdentical<
				$_<
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

		type X = $__<
			{
				a: { a?: 1 }
			} & {
				a?: { b: 2 }
			}
		>
		$Assert<
			IsIdentical<
				X,
				{
					a: {
						a?: 1
						b: 2
					}
				}
			>
		>()

		$Assert.is<
			IsIdentical<
				$_<
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

		type N = $_<number>
		$Assert<IsIdentical<N, number>>()

		type S = $_<string>
		$Assert<IsIdentical<S, string>>()

		type B = $_<boolean>
		$Assert<IsIdentical<B, boolean>>()
	})

	it('nullish', () => {
		expect.assertions(0)

		type Null = $_<null>
		$Assert<IsIdentical<Null, null>>()

		type Undef = $_<undefined>
		$Assert<IsIdentical<Undef, undefined>>()
	})

	it('nullish (generic)', <N extends null>() => {
		expect.assertions(0)

		type A = $_<N>
		$Assert.is<A, null>()
	})

	it('TS types - unknown, ...', () => {
		expect.assertions(0)

		// type U = $_<unknown>
		// Assert<IsIdentical<U, unknown>>()

		type Str = $_<string>
		$Assert<IsIdentical<Str, string>>()

		// type A = $_<any>
		// Assert<IsIdentical<A, any>>()

		type N = $_<never>
		$Assert<IsIdentical<N, never>>()

		type V = $_<void>
		$Assert<IsIdentical<V, void>>()
	})

	it('object', () => {
		expect.assertions(0)

		type O = $_<object>
		$Assert<IsIdentical<O, object>>()

		type OO = $_<{}>
		$Assert<IsIdentical<OO, {}>>()

		// eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
		type OOO = $_<Object>
		// eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
		$Assert<IsIdentical<OOO, Object>>()

		type OOOO = $_<Record<string, unknown>>
		$Assert<IsIdentical<OOOO, Record<string, unknown>>>()
	})

	it('works with index signatures', () => {
		expect.assertions(0)

		type X = $_<{ [k: string]: 1 | 2; b: 2 } & { a: 1 }>
		$Assert<IsIdentical<X, { [k: string]: 1 | 2; a: 1; b: 2 }>>()

		type A = $_<
			{ [k: string]: number; [k: number]: 2; [k: symbol]: 3 } & { a: 123 }
		>

		$Assert<
			IsIdentical<
				A,
				{ [k: string]: number; [k: number]: 2; [k: symbol]: 3; a: 123 }
			>
		>()
	})

	it('works with generics (unknown)', <X>() => {
		expect.assertions(0)

		$Assert.is<$_<X>, X>()
	})

	it('works with generics (string)', <X extends string>() => {
		expect.assertions(0)

		type Y = $_<X>
		$Assert.is<Y, X>()
	})

	it('readonly', () => {
		expect.assertions(0)

		type A = $_<{ readonly a: 1 }>
		$Assert<IsIdentical<A, { readonly a: 1 }>>()

		type B = $_<{ readonly a: 1 } & { readonly b: 2 }>
		$Assert<IsIdentical<B, { readonly a: 1; readonly b: 2 }>>()
	})
})
