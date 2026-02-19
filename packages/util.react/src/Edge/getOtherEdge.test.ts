// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import type { GetOtherEdge } from './getOtherEdge'
import { getOtherEdge } from './getOtherEdge'

describe('getOtherEdge', () => {
	it('works', () => {
		expect.hasAssertions()

		expect(getOtherEdge('top')).toBe('bottom')

		$Assert<IsIdentical<GetOtherEdge<'top'>, 'bottom'>>()
	})
})
