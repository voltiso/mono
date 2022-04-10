import { Assert } from '../bdd'
import { Newable } from './Newable'

describe('Newable', () => {
	it('works', () => {
		expect.assertions(0)
		Assert.isSubtype<abstract new (x: number) => number, Newable>()
		Assert.isSubtype<new (x: number) => number, Newable>()
	})
})
