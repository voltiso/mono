import { Assert } from '../../../bdd'
import { Not } from '../../../boolean'
import { strictNullChecks } from '../../strictNullChecks'

describe('Have_strictNullChecks', () => {
	it('works', () => {
		expect.assertions(0)
		Assert<Not<strictNullChecks>>()
	})
})
