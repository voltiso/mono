// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { strictNullChecks } from '~'
import { $Assert } from '~/$strip'

describe('Have_strictNullChecks', () => {
	it('works', () => {
		expect.assertions(0)

		$Assert<strictNullChecks>()
	})
})
