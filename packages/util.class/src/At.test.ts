/* eslint-disable no-magic-numbers */
import type { Assert, Is } from '@voltiso/assertor'
import { At, at } from './At'

describe('object/at', () => {
	it('works #1', () => {
		expect.assertions(0)
		const arr = [1, 2, 3]
		const v = at(arr, 0)
		Assert(Is(v)<number>())
	})

	it('works #2', () => {
		expect.assertions(0)
		const arr = [1, 2, 3] as const
		const v = at(arr, -1)
		Assert(Is(v)(3 as const))
	})

	it('works #3', () => {
		expect.assertions(0)
		type X = At<[...unknown[], 999], -1>
		Assert(Is<X>()(999 as const))
	})

	it('works #4', () => {
		expect.assertions(0)
		type X = At<[999, ...unknown[]], 0>
		Assert(Is<X>()(999 as const))
	})
})
