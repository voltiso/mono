// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { Assert, Is } from '../type'
import type { Xor } from './Xor.js'

describe('xor', () => {
	it('works', () => {
		expect.assertions(0)

		Assert(
			Is<Xor<false, true>>() //
				.identicalTo<true>(),

			Is<Xor<true, false>>() //
				.identicalTo<true>(),

			Is<Xor<true, true>>() //
				.identicalTo<false>(),

			Is<Xor<false, false>>() //
				.identicalTo<false>(),

			Is<Xor<false, boolean>>() //
				.identicalTo<boolean>(),

			Is<Xor<true, boolean>>() //
				.identicalTo<boolean>(),
		)
	})
})