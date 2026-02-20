// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, it } from '@jest/globals'
import { $Assert } from '_'

import type { IsIdentical } from '~/type'

// biome-ignore lint/suspicious/noShadowRestrictedNames: .
import type { Array } from './ArrayMap'

describe('ArrayMap', () => {
	it('works', () => {
		type A = Array.Map<[[1, 2], [2, 3], [3, 4]], 'JoinWithDots'>
		$Assert<IsIdentical<A, ['1.2', '2.3', '3.4']>>()
	})
})
