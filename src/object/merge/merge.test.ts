/* eslint-disable @typescript-eslint/ban-types */
import { Assert } from '../../bdd'
import { IsIdentical } from '../../IsEqual'
import { Merge } from './merge'

describe('merge', function () {
	it('works', function () {
		expect.assertions(0)

		// @ts-expect-error either array or individual args
		type _X = Merge<[{ a: 1 }], { b: 2 }>

		Assert<IsIdentical<Merge<[]>, {}>>()
		Assert<IsIdentical<Merge<[{ a: 1 }]>, { a: 1 }>>()
		Assert<IsIdentical<Merge<[{ a: 1 }, { b: 2 }]>, { a: 1; b: 2 }>>()
		Assert<IsIdentical<Merge<[{ a: 1 }, { a: 2 }]>, { a: 2 }>>()
		Assert<IsIdentical<Merge<[{ a: { a: 1 } }, { a: { b: 2 } }]>, { a: { b: 2 } }>>()
		Assert<IsIdentical<Merge<[{ a: 1 }, { b: 2 }, { c: 3 }]>, { a: 1; b: 2; c: 3 }>>()

		Assert<IsIdentical<Merge<{ a: 1 }>, { a: 1 }>>()
		Assert<IsIdentical<Merge<{ a: 1 }, { b: 2 }>, { a: 1; b: 2 }>>()
		Assert<IsIdentical<Merge<{ a: 1 }, { a: 2 }>, { a: 2 }>>()
		Assert<IsIdentical<Merge<{ a: { a: 1 } }, { a: { b: 2 } }>, { a: { b: 2 } }>>()
		Assert<IsIdentical<Merge<{ a: 1 }, { b: 2 }, { c: 3 }>, { a: 1; b: 2; c: 3 }>>()
	})
})
