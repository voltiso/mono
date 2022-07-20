// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { Assert, Is } from '../type'
import type { Or } from './Or.js'

describe('or', () => {
	it('works', () => {
		expect.assertions(0)

		Assert(
			Is<Or<true, true>>() //
				.identicalTo<true>(),

			Is<Or<true, false>>() //
				.identicalTo<true>(),

			Is<Or<false, boolean>>() //
				.identicalTo<boolean>(),

			Is<Or<true, boolean>>() //
				.identicalTo<true>(),

			Is<Or<boolean, boolean>>() //
				.identicalTo<boolean>(),
		)
	})
})
