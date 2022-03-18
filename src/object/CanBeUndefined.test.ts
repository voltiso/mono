import { Assert } from '../assert'
import { CanBeUndefined } from './CanBeUndefined'

describe('canBeUndefined', () => {
	it('works', () => {
		expect.assertions(0)
		Assert<CanBeUndefined<{ x: 0; a: 1 }, 'a'>, false>()
		Assert<CanBeUndefined<{ x: 0; a: 1 | undefined }, 'a'>, true>()
		Assert<CanBeUndefined<{ x: 0; a?: 1 }, 'a'>, false>()
		Assert<CanBeUndefined<{ x: 0; a?: 1 | undefined }, 'a'>, true>()
	})
})
