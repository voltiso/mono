// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Not } from '../../../boolean'
import { Assert } from '../../../type'
import type { strictNullChecks } from '..'

describe('Have_strictNullChecks', () => {
	it('works', () => {
		expect.assertions(0)

		Assert<Not<strictNullChecks>>()
	})
})
