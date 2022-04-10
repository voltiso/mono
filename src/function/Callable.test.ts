import { Assert } from '../bdd'
import { Callable } from './Callable'

describe('Callable', () => {
	it('works', () => {
		expect.assertions(0)
		Assert.isSubtype<(x: number) => number, Callable>()
	})
})
