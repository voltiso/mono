// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '_'

import type { Not } from '~'

import type { strictNullChecks } from '..'

describe('Have_strictNullChecks', () => {
	it('works', () => {
		expect.assertions(0)

		$Assert<Not<strictNullChecks>>()
	})
})
