// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Not } from '../../../boolean'
import { Assert } from '../../../type'
import type { exactOptionalPropertyTypes } from '../exactOptionalPropertyTypes.js'

describe('exactOptionalPropertyTypes - false', () => {
	it('works', () => {
		expect.assertions(0)

		Assert<Not<exactOptionalPropertyTypes>>()
	})
})
