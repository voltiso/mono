import { Assert } from '../../../bdd'
import { Not } from '../../../boolean'
import { strictNullChecks } from '../..'

describe('Have_strictNullChecks', () => {
	it('works', () => {
		expect.assertions(0)
		Assert<Not<strictNullChecks>>()
	})
})
