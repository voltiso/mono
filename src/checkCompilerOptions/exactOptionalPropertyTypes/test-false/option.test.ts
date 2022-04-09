import { Assert } from '../../../bdd'
import { Not } from '../../../boolean'
import { Have_exactOptionalPropertyTypes } from '../..'

describe('Have_exactOptionalPropertyTypes', () => {
	it('works', () => {
		expect.assertions(0)
		Assert<Not<Have_exactOptionalPropertyTypes>>()
	})
})
