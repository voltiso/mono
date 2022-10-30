// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '~';
import { $Assert } from '~'

import type { Flat } from './Flat'

describe('Flat', () => {
	it('works', () => {
		type FlatTest = Flat<[1, 2, [3, [4, 5]]]>

		$Assert<IsIdentical<FlatTest, [1, 2, 3, 4, 5]>>()
	})
})
