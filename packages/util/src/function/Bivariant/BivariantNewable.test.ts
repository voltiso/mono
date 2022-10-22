// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert, $Is } from '~/$strip'

import type { BivariantNewable } from './BivariantNewable'

describe('Bivariant', () => {
	it('newable', () => {
		expect.assertions(0)

		$Assert.is<new (x: 0) => 0, BivariantNewable<new (x: 0 | 1) => 0 | 1>>()
		$Assert.is<new (x: 0 | 1) => 0, BivariantNewable<new (x: 0) => 0 | 1>>()

		$Assert(
			$Is<new (x: 0 | 1) => 0>().not.subtypeOf<
				BivariantNewable<new (x: 1 | 2) => 0>
			>(),
		)
	})

	//! TODO - possible with abstract class??
	// eslint-disable-next-line jest/no-commented-out-tests
	// it('newable - abstract', () => {
	// 	expect.assertions(0)

	// 	Assert.is<abstract new (x: 0) => 0, BivariantNewable<abstract new (x: 0 | 1) => 0 | 1>>()
	// 	Assert.is<abstract new (x: 0 | 1) => 0, BivariantNewable<abstract new (x: 0) => 0 | 1>>()

	// 	Assert(
	// 		Is< abstract new (x: 0 | 1) => 0>().not.subtypeOf<
	// 			BivariantNewable<abstract new (x: 1 | 2) => 0>
	// 		>(),
	// 	)
	// })
})
