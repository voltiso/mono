/* eslint-disable @typescript-eslint/ban-types */
import { Assert, Is } from './bdd'

describe('isEqual', () => {
	it('works', () => {
		expect.assertions(0)

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
	})
})
