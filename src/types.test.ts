import { Assert } from './bdd'
import { Callable } from './types'

describe('callable', () => {
	it('works', () => {
		expect.assertions(0)
		Assert.isSubtype<(x: number) => number, Callable<any[]>>()
	})
})
