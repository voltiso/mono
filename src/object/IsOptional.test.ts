import { Assert } from '../bdd'
import { IsOptional } from './IsOptional'

describe('isOptional', () => {
	it('works', () => {
		expect.assertions(0)
		Assert.isSubtype<IsOptional<{ a?: 1; b: 2 }, 'a'>, true>()
		Assert.isSubtype<IsOptional<{ a: 1; b: 2 }, 'a'>, false>()
		Assert.isSubtype<IsOptional<{ a?: 1 | undefined; b: 2 }, 'a'>, true>()
		Assert.isSubtype<IsOptional<{ a: 1 | undefined; b: 2 }, 'a'>, false>()
	})
})
