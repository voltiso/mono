// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '_'
import { describe, it } from '@jest/globals'

import type { IsIdentical } from '~/type'

import type { Flat } from './Flat'

describe('Flat', () => {
	it('works', () => {
		type FlatTest = Flat<[1, 2, [3, [4, 5]]]>

		$Assert<IsIdentical<FlatTest, [1, 2, 3, 4, 5]>>()
	})
})
