// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '_'

import type { exactOptionalPropertyTypes, Not } from '~'

describe('exactOptionalPropertyTypes - false', () => {
	it('works', () => {
		expect.assertions(0)

		$Assert<Not<exactOptionalPropertyTypes>>()
	})
})
