import { Assert } from '../assert'
import { def, Def } from './op'

describe('def', () => {
	it('works', () => {
		expect.assertions(0)
		Assert<Def<def, 123>, 123>()
		Assert<Def<1, 2>, 1>()
	})
})
