/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/ban-types */
import { expect } from 'chai'
import { Assert } from '../../assert'
import { IsIdentical } from '../../IsEqual'
import { mergeDeep, MergeDeep } from './mergeDeep'

// @ts-expect-error
type _X = MergeDeep<[{ a: 1 }], { b: 2 }>

Assert<IsIdentical<MergeDeep<[]>, {}>>()
Assert<IsIdentical<MergeDeep<[{ a: 1 }]>, { a: 1 }>>()
Assert<IsIdentical<MergeDeep<[{ a: 1 }, { b: 2 }]>, { a: 1; b: 2 }>>()
Assert<IsIdentical<MergeDeep<[{ a: 1 }, { a: 2 }]>, { a: 2 }>>()
Assert<IsIdentical<MergeDeep<[{ a: { a: 1 } }, { a: { b: 2 } }]>, { a: { a: 1; b: 2 } }>>()
Assert<IsIdentical<MergeDeep<[{ a: 1 }, { b: 2 }, { c: 3 }]>, { a: 1; b: 2; c: 3 }>>()

Assert<IsIdentical<MergeDeep<{ a: 1 }>, { a: 1 }>>()
Assert<IsIdentical<MergeDeep<{ a: 1 }, { b: 2 }>, { a: 1; b: 2 }>>()
Assert<IsIdentical<MergeDeep<{ a: 1 }, { a: 2 }>, { a: 2 }>>()
Assert<IsIdentical<MergeDeep<{ a: { a: 1 } }, { a: { b: 2 } }>, { a: { a: 1; b: 2 } }>>()
Assert<IsIdentical<MergeDeep<{ a: 1 }, { b: 2 }, { c: 3 }>, { a: 1; b: 2; c: 3 }>>()

Assert<IsIdentical<MergeDeep<{ a: 1; b: 1 }, { a: 2; b: 2 }>, { a: 2; b: 2 }>>()
Assert<IsIdentical<MergeDeep<{ a: 1; b: 1 }, { a: 2; b: { ba: 2 } }>, { a: 2; b: { ba: 2 } }>>()
Assert<IsIdentical<MergeDeep<{ a: 1; b: { bb: 1 } }, { a: 2; b: { ba: 2 } }>, { a: 2; b: { bb: 1; ba: 2 } }>>()

Assert<IsIdentical<MergeDeep<{ a: 1; b: { bb: 1 } }, { a: 2; b: 2 }>, { a: 2; b: 2 }>>()

describe('mergeDeep', function () {
	it('works', function () {
		expect(mergeDeep({ a: { a: 1 } }, { a: { b: 2 } })).to.deep.equal({ a: { a: 1, b: 2 } })
		expect(mergeDeep({ a: { a: 1 } }, { a: 2 })).to.deep.equal({ a: 2 })
	})
})
