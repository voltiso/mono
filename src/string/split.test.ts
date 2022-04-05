import { Assert } from '../assert'
import { IsEqual } from '../IsEqual'
import { Split } from './split'

describe('split', () => {
	it('works', () => {
		expect.assertions(0)
		Assert<IsEqual<Split<'asd/sdf/dfg', '/'>, readonly ['asd', 'sdf', 'dfg']>>()
		Assert<IsEqual<Split<string, '/'>, readonly string[]>>()
	})
})
