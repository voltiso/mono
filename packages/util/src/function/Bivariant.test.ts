// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { Assert } from '~/type'

import type { Bivariant } from './Bivariant'

describe('Bivariant', () => {
	it('callable', () => {
		expect.assertions(0)

		Assert.is<(x: 0) => 0, Bivariant<(x: 0 | 1) => 0 | 1>>()
		Assert.is<(x: 0 | 1) => 0, Bivariant<(x: 0) => 0 | 1>>()
		// Assert.is<(x: 0 | 1) => 0, Bivariant<(x: 0 | 2) => 0 | 1>>()
		// Assert.is<(x: 0 | 1) => 0 | 1, Bivariant<(x: 0) => 0>>()
	})

	// ! seems impossible?
	// eslint-disable-next-line jest/no-commented-out-tests
	// it('newable', () => {
	// 	expect.assertions(0)

	// 	Assert.is<new (x: 0) => 0, BivariantNewable<[0 | 1], 0 | 1>>()
	// 	Assert.is<new (x: 0 | 1) => 0, BivariantNewable<[0], 0 | 1>>()
	// 	// Assert.is<(x: 0 | 1) => 0, Bivariant<(x: 0 | 2) => 0 | 1>>()
	// 	// Assert.is<(x: 0 | 1) => 0 | 1, Bivariant<(x: 0) => 0>>()
	// })
})
