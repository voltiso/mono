import { Assert } from '../../../bdd'
import { Not } from '../../../boolean'
import { exactOptionalPropertyTypes } from '../..'

describe('Have_exactOptionalPropertyTypes', () => {
	it('works', () => {
		expect.assertions(0)
		Assert<Not<exactOptionalPropertyTypes>>()
	})
})
