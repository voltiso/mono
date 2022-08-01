// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { Assert, Is } from '~/type'

import type { Not } from './Not'

describe('not', () => {
	it('works', () => {
		expect.assertions(0)

		Assert(
			Is<Not<true>>() //
				.identicalTo<false>(),

			Is<Not<false>>() //
				.identicalTo<true>(),

			Is<Not<boolean>>() //
				.identicalTo<boolean>(),
		)
	})
})
