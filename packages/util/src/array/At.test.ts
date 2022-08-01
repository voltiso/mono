// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { Assert, Is } from '~/type/static-assert'

import type { At } from './At'
import { at } from './At'

describe('object/at', () => {
	it('works #1', () => {
		expect.assertions(0)

		const array = [1, 2, 3]
		const v = at(array, 0)
		Assert(Is(v)<number>())
	})

	it('works #2', () => {
		expect.assertions(0)

		const array = [1, 2, 3] as const
		const v = at(array, -1)
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
