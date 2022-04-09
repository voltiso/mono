/* eslint-disable @typescript-eslint/ban-types */
import { Assert } from '../../assert'
import { IsCompatible, IsIdentical } from '../../IsEqual'
import { Flatten, Flatten2 } from './Flatten'

describe('Flatten', () => {
	it('works', () => {
		expect.assertions(0)

		type A = Flatten<{ a: 1 } & { b?: 2 }>
		Assert<IsIdentical<A, { a: 1; b?: 2 }>>()
		Assert<IsIdentical<Flatten<{ a?: 1 }>, { a?: 1 }>>()
		Assert<IsIdentical<Flatten<{ a?: 1 | undefined }>, { a?: 1 }>, false>()
		Assert<IsIdentical<Flatten<{ a: 1 | undefined }>, { a?: 1 }>, false>()
		Assert<IsIdentical<Flatten<{ a: 1 | undefined }>, { a?: 1 | undefined }>, false>()
		Assert<IsIdentical<Flatten<{ a: 1 | undefined }>, { a: 1 | undefined }>>()

		Assert<Flatten<number>, number>()
		Assert<number, Flatten<number>>()

		Assert<Flatten<string>, string>()
		Assert<string, Flatten<string>>()

		Assert<Date, Flatten<Date>>()
		Assert<Flatten<Date>, Date>()

		type TypeofDate = typeof Date
		type FTypeofDate = Flatten<TypeofDate>
		Assert<IsCompatible<FTypeofDate, TypeofDate>>()

		type Rec = Rec[] | string
		type FRec = Flatten<Rec>
		Assert<IsIdentical<Rec, FRec>>()

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

		type O = Flatten<object>
		Assert<IsIdentical<O, object>>()

		type OO = Flatten<{}>
		Assert<IsIdentical<OO, {}>>()

		type OOO = Flatten<Object>
		Assert<IsIdentical<OOO, Object>>()

		type OOOO = Flatten<Record<string, unknown>>
		Assert<IsIdentical<OOOO, Record<string, unknown>>>()

		type B = Flatten<boolean>
		Assert<IsIdentical<B, boolean>>()

		type U = Flatten<unknown>
		Assert<IsIdentical<U, unknown>>()

		type Null = Flatten<null>
		Assert<IsIdentical<Null, null>>()

		type Undef = Flatten<undefined>
		Assert<IsIdentical<Undef, undefined>>()
	})

	it('works with index signatures', () => {
		expect.assertions(0)
		type X = Flatten<{ b: 2; [k: string]: 1 | 2 } & { a: 1 }>
		Assert<IsIdentical<X, { [k: string]: 1 | 2; a: 1; b: 2 }>>()
	})

	// eslint-disable-next-line jest/no-commented-out-tests
	// it('works with call signatures', () => {
	// 	expect.assertions(0)
	// 	type X = Flatten<((str: string) => number) & { a: 1 } & {b: 2}>
	// })

	it('works with construct signatures', () => {
		expect.assertions(0)

		type X = Flatten<new (n: number) => string>
		Assert<IsIdentical<X, new (n: number) => string>>()

		type XX = Flatten<(new (x: 22) => string) & { a?: 1 }>
		Assert<IsCompatible<XX, { new (x: 22): string; a?: 1 }>>()
		// Assert<IsIdentical<XX, { new (x: 22): string; a: 1 }>>()
	})

	// eslint-disable-next-line jest/no-commented-out-tests
	// it('works with call and construct signatures', () => {
	// 	expect.assertions(0)
	// 	type X = Flatten<((str: string) => number) & ((x: 22) => string) & { a: 1 }>
	// })

	it('works with generics (unknown)', <X>() => {
		expect.assertions(0)
		type Y = Flatten<X>
		Assert<Y, X>()
		// Assert<X, Y>()
	})

	it('works with generics (string)', <X extends string>() => {
		expect.assertions(0)
		type Y = Flatten<X>
		Assert<Y, X>()
		// Assert<X, Y>()
	})

	// eslint-disable-next-line jest/no-commented-out-tests
	// it('fancy', () => {
	// 	expect.assertions(0)

	// 	interface UnknownDTI {
	// 		tag: string

	// 		const: { id?: never }
	// 		public: { id?: never }
	// 		private: { id?: never }
	// 		protected: { id?: never }

	// 		methods: object

	// 		doc?: number | undefined
	// 		docInside?: number | undefined
	// 	}

	// 	type ___<X extends UnknownDTI> = Flatten<{
	// 		tag: X['tag']

	// 		public: Flatten<X['public']>
	// 		const: Flatten<X['const']>
	// 		private: Flatten<X['private']>
	// 		protected: Flatten<X['protected']>

	// 		methods: X['methods']

	// 		doc: X['doc']
	// 		docInside: X['docInside']
	// 	}>

	// 	type X = ___<Omit<UnknownDTI, 'tag'> & { tag: 'doctorD' } & { public: { asd: 123 } }>
	// })
})
