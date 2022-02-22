import { Assert } from '../assert'
import { IsEqual } from '../IsEqual'
import { Join } from './join'

describe('join', () => {
	it('works', () => {
		expect.assertions(0)
		Assert<IsEqual<Join<['asd', 'sdf'], '/'>, 'asd/sdf'>>()
	})
})
