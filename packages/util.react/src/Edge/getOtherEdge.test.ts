// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { Assert } from '@voltiso/util'

import type { GetOtherEdge } from './getOtherEdge.js'
import { getOtherEdge } from './getOtherEdge.js'

describe('getOtherEdge', () => {
	it('works', () => {
		expect.hasAssertions()

		expect(getOtherEdge('top')).toBe('bottom')

		Assert<IsIdentical<GetOtherEdge<'top'>, 'bottom'>>()
	})
})
