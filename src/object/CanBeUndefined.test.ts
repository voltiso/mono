import { Assert } from '../bdd'
import { CanBeUndefined } from './CanBeUndefined'

describe('canBeUndefined', () => {
	it('works', () => {
		expect.assertions(0)
		Assert.isSubtype<CanBeUndefined<{ x: 0; a: 1 }, 'a'>, false>()
		Assert.isSubtype<CanBeUndefined<{ x: 0; a: 1 | undefined }, 'a'>, true>()
		Assert.isSubtype<CanBeUndefined<{ x: 0; a?: 1 }, 'a'>, false>()
		Assert.isSubtype<CanBeUndefined<{ x: 0; a?: 1 | undefined }, 'a'>, true>()
	})
})
