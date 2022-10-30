// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '~'
import { $Assert } from '~'

import type { Array } from './ArrayMap'

describe('ArrayMap', () => {
	it('works', () => {
		type A = Array.Map<[[1, 2], [2, 3], [3, 4]], 'JoinWithDots'>
		$Assert<IsIdentical<A, ['1.2', '2.3', '3.4']>>()
	})
})
