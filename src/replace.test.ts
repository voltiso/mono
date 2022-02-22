import { Assert } from './assert'
import { IsEqual } from './IsEqual'
import { ArrayReplaceIf, ReplaceIf } from './replace'

describe('replace', () => {
	it('works', () => {
		expect.assertions(0)
		Assert<ReplaceIf<number, 123, 'isNumber'>, 123>()
		Assert<IsEqual<ArrayReplaceIf<['sdf', 2, 1, 'dfg', 2], 10, 'isString'>, [10, 2, 1, 10, 2]>>()
		Assert<IsEqual<ArrayReplaceIf<[string, 'a', 'x'], null, 'isSuperString'>, [null, 'a', 'x']>>()
		Assert<IsEqual<ArrayReplaceIf<['', 'asd', 0, 123], 'TEST', 'isNumber 1 & !!1'>, ['', 'asd', 0, 'TEST']>>()
	})
})
