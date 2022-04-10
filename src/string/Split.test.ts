import { Assert } from '../bdd'
import { IsEqual } from '../IsEqual'
import { Split } from './Split'

describe('split', () => {
	it('works', () => {
		expect.assertions(0)
		Assert<IsEqual<Split<'asd/sdf/dfg', '/'>, readonly ['asd', 'sdf', 'dfg']>>()
		Assert<IsEqual<Split<string, '/'>, readonly string[]>>()
	})
})
