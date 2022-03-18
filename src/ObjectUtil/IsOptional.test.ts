import { Assert } from '../assert'
import { IsOptional } from './IsOptional'

describe('isOptional', () => {
	it('works', () => {
		expect.assertions(0)
		Assert<IsOptional<{ a?: 1; b: 2 }, 'a'>, true>()
		Assert<IsOptional<{ a: 1; b: 2 }, 'a'>, false>()
		Assert<IsOptional<{ a?: 1 | undefined; b: 2 }, 'a'>, true>()
		Assert<IsOptional<{ a: 1 | undefined; b: 2 }, 'a'>, false>()
	})
})
