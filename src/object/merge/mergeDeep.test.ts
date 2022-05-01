/* eslint-disable no-undefined */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-magic-numbers */
/* eslint-disable @typescript-eslint/ban-types */
import { Assert } from '../../bdd'
import { IsIdentical } from '../../IsEqual'
import { mergeDeep, MergeDeep } from './mergeDeep'

describe('mergeDeep', () => {
	it('works - static', () => {
		expect.assertions(0)

		// @ts-expect-error either array or individual args
		type _X = MergeDeep<[{ a: 1 }], { b: 2 }>

		Assert<
			IsIdentical<MergeDeep<[]>, {}>,
			IsIdentical<MergeDeep<[{ a: 1 }]>, { a: 1 }>,
			IsIdentical<MergeDeep<[{ a: 1 }, { b: 2 }]>, { a: 1; b: 2 }>,
			IsIdentical<MergeDeep<[{ a: 1 }, { a: 2 }]>, { a: 2 }>,
			IsIdentical<MergeDeep<[{ a: { a: 1 } }, { a: { b: 2 } }]>, { a: { a: 1; b: 2 } }>,
			IsIdentical<MergeDeep<[{ a: 1 }, { b: 2 }, { c: 3 }]>, { a: 1; b: 2; c: 3 }>,
			IsIdentical<MergeDeep<{ a: 1 }>, { a: 1 }>,
			IsIdentical<MergeDeep<{ a: 1 }, { b: 2 }>, { a: 1; b: 2 }>,
			IsIdentical<MergeDeep<{ a: 1 }, { a: 2 }>, { a: 2 }>,
			IsIdentical<MergeDeep<{ a: { a: 1 } }, { a: { b: 2 } }>, { a: { a: 1; b: 2 } }>,
			IsIdentical<MergeDeep<{ a: 1 }, { b: 2 }, { c: 3 }>, { a: 1; b: 2; c: 3 }>,
			IsIdentical<MergeDeep<{ a: 1; b: 1 }, { a: 2; b: 2 }>, { a: 2; b: 2 }>,
			IsIdentical<MergeDeep<{ a: 1; b: 1 }, { a: 2; b: { ba: 2 } }>, { a: 2; b: { ba: 2 } }>,
			IsIdentical<MergeDeep<{ a: 1; b: { bb: 1 } }, { a: 2; b: { ba: 2 } }>, { a: 2; b: { bb: 1; ba: 2 } }>,
			IsIdentical<MergeDeep<{ a: 1; b: { bb: 1 } }, { a: 2; b: 2 }>, { a: 2; b: 2 }>,
			// skip undefined
			IsIdentical<MergeDeep<{ a: 1 }, { a: undefined }>, { a: 1 }>
		>()

		// type A = MergeDeep2<X, { a: 1 }>
	})

	it('works', () => {
		expect.hasAssertions()

		expect(mergeDeep({ a: { a: 1 } }, { a: { b: 2 } })).toStrictEqual({ a: { a: 1, b: 2 } })
		expect(mergeDeep({ a: { a: 1 } }, { a: 2 })).toStrictEqual({ a: 2 })

		// skip undefined
		expect(mergeDeep({ a: 1 }, { a: undefined })).toStrictEqual({ a: 1 })
	})
})
