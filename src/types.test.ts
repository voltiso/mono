import { Assert } from './assert'
import { Callable } from './types'

describe('callable', () => {
	it('works', () => {
		expect.assertions(0)
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		Assert<(x: number) => number, Callable<any[]>>()
	})
})
