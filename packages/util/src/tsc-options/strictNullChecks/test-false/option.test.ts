// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Not } from '~'
import { $Assert } from '~/$strip'

import type { strictNullChecks } from '..'

describe('Have_strictNullChecks', () => {
	it('works', () => {
		expect.assertions(0)

		$Assert<Not<strictNullChecks>>()
	})
})
