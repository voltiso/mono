/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Assert } from './assert'
import { IsCompatible, IsEqual, IsIdentical } from './IsEqual'

describe('isEqual', () => {
	it('works', () => {
		expect.assertions(0)

		Assert<IsCompatible<{}, Record<string, any>>, true>() // hmm...
		Assert<IsIdentical<{}, Record<string, any>>, false>()
		Assert<IsEqual<{}, Record<string, any>>, false>()

		Assert<IsCompatible<{ a: 1; b: 1 }, { a: 1 } & { b: 1 }>, true>()
		Assert<IsIdentical<{ a: 1; b: 1 }, { a: 1 } & { b: 1 }>, false>() // oops...
		Assert<IsEqual<{ a: 1; b: 1 }, { a: 1 } & { b: 1 }>, true>()

		Assert<IsCompatible<{ a: { a: 1; b: 1 } }, { a: { a: 1 } & { b: 1 } }>, true>()
		Assert<IsIdentical<{ x: { a: 1; b: 1 } }, { x: { a: 1 } & { b: 1 } }>, false>() // oops...
		Assert<IsEqual<{ a: { a: 1; b: 1 } }, { a: { a: 1 } & { b: 1 } }>, true>()

		Assert<IsCompatible<{ a: 1 }, { a: 1 | undefined }>, false>()
		Assert<IsIdentical<{ a: 1 }, { a: 1 | undefined }>, false>()
		Assert<IsEqual<{ a: 1 }, { a: 1 | undefined }>, false>()

		Assert<IsCompatible<{ a?: 1 }, { a: 1 | undefined }>, false>()
		Assert<IsIdentical<{ a?: 1 }, { a: 1 | undefined }>, false>()
		Assert<IsEqual<{ a?: 1 }, { a: 1 | undefined }>, false>()

		Assert<IsCompatible<{ a?: 1 }, { a?: 1 | undefined }>, false>()
		Assert<IsIdentical<{ a?: 1 }, { a?: 1 | undefined }>, false>()
		Assert<IsEqual<{ a?: 1 }, { a?: 1 | undefined }>, false>()

		Assert<IsCompatible<any, unknown>, true>() // hmm...
		Assert<IsIdentical<any, unknown>, false>()
		Assert<IsEqual<any, unknown>, false>()

		type Rec = Rec[] | string
		Assert<IsCompatible<Rec, Rec[] | string>>()
		Assert<IsIdentical<Rec, Rec[] | string>>()
		Assert<IsEqual<Rec, Rec[] | string>>()
	})
})
