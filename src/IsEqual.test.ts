/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-statements */
/* eslint-disable @typescript-eslint/ban-types */
import { Assert, Is } from './modules/bdd'
import { Callable } from './modules/function'
import { IsIdentical } from './IsEqual'

describe('isEqual', () => {
	it('simple', () => {
		expect.assertions(0)
		Assert<IsIdentical<unknown, unknown>>()
	})

	it('works', () => {
		expect.assertions(0)

		Assert(
			Is<123>().relatedTo<number>(),
			Is<number>().relatedTo<123>(),
			Is<number>().relatedTo<number>(),
			Is<123>().not.relatedTo<444>(),
			Is<number>().not.relatedTo<string>()
		)

		Assert(
			Is<{}>().compatibleWith<Record<string, any>>(), // hmm...
			Is<{}>().not.identicalTo<Record<string, any>>(),
			Is<{}>().not.equalTo<Record<string, any>>()
		)

		Assert(
			Is<{ a: 1; b: 1 }>().compatibleWith<{ a: 1 } & { b: 1 }>(),
			Is<{ a: 1; b: 1 }>().not.identicalTo<{ a: 1 } & { b: 1 }>(), // oops...
			Is<{ a: 1; b: 1 }>().equalTo<{ a: 1 } & { b: 1 }>()
		)

		Assert(
			Is<{ a: { a: 1; b: 1 } }>().compatibleWith<{ a: { a: 1 } & { b: 1 } }>(),
			Is<{ x: { a: 1; b: 1 } }>().not.identicalTo<{ x: { a: 1 } & { b: 1 } }>(), // oops...
			Is<{ a: { a: 1; b: 1 } }>().equalTo<{ a: { a: 1 } & { b: 1 } }>()
		)

		Assert(
			Is<{ a: 1 }>().not.compatibleWith<{ a: 1 | undefined }>(),
			Is<{ a: 1 }>().not.identicalTo<{ a: 1 | undefined }>(),
			Is<{ a: 1 }>().not.equalTo<{ a: 1 | undefined }>()
		)

		Assert(
			Is<{ a?: 1 }>().not.compatibleWith<{ a: 1 | undefined }>(),
			Is<{ a?: 1 }>().not.identicalTo<{ a: 1 | undefined }>(),
			Is<{ a?: 1 }>().not.equalTo<{ a: 1 | undefined }>()
		)

		Assert(
			Is<{ a?: 1 }>().not.compatibleWith<{ a?: 1 | undefined }>(),
			Is<{ a?: 1 }>().not.identicalTo<{ a?: 1 | undefined }>(),
			Is<{ a?: 1 }>().not.equalTo<{ a?: 1 | undefined }>()
		)

		Assert(
			Is<any>().compatibleWith<unknown>(), // hmm...
			Is<any>().not.identicalTo<unknown>(),
			Is<any>().not.equalTo<unknown>()
		)

		type Rec = Rec[] | string
		Assert(
			Is<Rec>().compatibleWith<Rec[] | string>(),
			Is<Rec>().identicalTo<Rec[] | string>(),
			Is<Rec>().equalTo<Rec[] | string>()
		)

		Assert(
			Is<{ a: 1 }>().not.compatibleWith<{ a: 1 | undefined }>()
			//
		)

		Assert(
			Is<(a: string) => number>().compatibleWith<
				(this: bigint, a: string) => number
			>(), // hmm
			Is<(a: string) => number>().not.identicalTo<
				(this: bigint, a: string) => number
			>(),
			Is<(a: string) => number>().not.equalTo<
				(this: bigint, a: string) => number
			>()
		)

		Assert(
			Is<Callable>() //
				.identicalTo<(...args: never[]) => unknown>()
		)

		type C = {
			c: {} & {
				c: C
			}
		}

		Assert(
			Is<C>() //
				.identicalTo<{ c: { c: C } }>()
		)

		Assert(
			Is<{ a: 1 }>().not.nonStrictEqualTo<{ a?: 1 }>(),
			Is<{ a: 1 }>().not.nonStrictEqualTo<{ a?: 1 | undefined }>(),
			Is<{ a: 1 }>().not.nonStrictEqualTo<{ a: 1 | undefined }>(),
			Is<{ a: 1 | undefined }>().nonStrictEqualTo<{ a?: 1 }>(),
			Is<{ a: 1 | undefined }>().nonStrictEqualTo<{ a?: 1 | undefined }>()
			//
		)
	})
})
