// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { exactOptionalPropertyTypes, Not } from '~'
import { $Assert } from '_'

describe('exactOptionalPropertyTypes - false', () => {
	it('works', () => {
		expect.assertions(0)

		$Assert<Not<exactOptionalPropertyTypes>>()
	})
})
