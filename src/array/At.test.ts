import { Assert } from '../assert'
import { IsIdentical } from '../IsEqual'
import { At, at } from './At'

describe('object/at', () => {
	it('works #1', () => {
		expect.assertions(0)
		const arr = [1, 2, 3]
		const v = at(arr, 0)
		Assert<IsIdentical<typeof v, number>>()
	})

	it('works #2', () => {
		expect.assertions(0)
		const arr = [1, 2, 3] as const
		const v = at(arr, -1)
		Assert<IsIdentical<typeof v, 3>>()
	})

	it('works #3', () => {
		expect.assertions(0)
		type X = At<[...unknown[], 999], -1>
		Assert<IsIdentical<X, 999>>()
	})

	it('works #4', () => {
		expect.assertions(0)
		type X = At<[999, ...unknown[]], 0>
		Assert<IsIdentical<X, 999>>()
	})
})
