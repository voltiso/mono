import { Assert } from '../../../bdd'
import { Not } from '../../../boolean'
import { exactOptionalPropertyTypes } from '../exactOptionalPropertyTypes'

describe('exactOptionalPropertyTypes - false', () => {
	it('works', () => {
		expect.assertions(0)
		Assert<Not<exactOptionalPropertyTypes>>()
	})
})
