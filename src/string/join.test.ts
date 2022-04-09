import { Assert } from '../bdd'
import { IsEqual } from '../IsEqual'
import { Join } from './join'

describe('join', () => {
	it('works', () => {
		expect.assertions(0)
		Assert<IsEqual<Join<['asd', 'sdf'], '/'>, 'asd/sdf'>>()
		Assert<IsEqual<Join<['a', 'b', 'c', 'd'], '/'>, 'a/b/c/d'>>()
		Assert<IsEqual<Join<['a', 'b', 'c', 'd']>, 'abcd'>>()
		Assert<IsEqual<Join<['a', 'b', 'c', 'd'], ''>, 'abcd'>>()
	})
})
