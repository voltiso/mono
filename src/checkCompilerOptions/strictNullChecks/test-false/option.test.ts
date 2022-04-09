import { Assert } from '../../../bdd'
import { Not } from '../../../boolean'
import { Have_strictNullChecks } from '../..'

describe('Have_strictNullChecks', () => {
	it('works', () => {
		expect.assertions(0)
		Assert<Not<Have_strictNullChecks>>()
	})
})
