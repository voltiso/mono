// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { exactOptionalPropertyTypes } from '~'
import { $Assert } from '~/$strip'

describe('exactOptionalPropertyTypes - true', () => {
	it('works', () => {
		expect.assertions(0)

		$Assert<exactOptionalPropertyTypes>()
	})
})
