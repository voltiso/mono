import { Assert } from '../../../bdd'
import { strictNullChecks } from '../../strictNullChecks'

describe('Have_strictNullChecks', () => {
	it('works', () => {
		expect.assertions(0)
		Assert<strictNullChecks>()
	})
})
