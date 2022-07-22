// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { Assert } from '@voltiso/util'

import type { GetEdgeFromDirection } from './getEdgeFromDirection.js'
import { getEdgeFromDirection } from './getEdgeFromDirection.js'

describe('getEdgeFromDirection', () => {
	it('works', () => {
		expect.hasAssertions()

		expect(getEdgeFromDirection('up')).toBe('top')

		Assert<IsIdentical<GetEdgeFromDirection<'up'>, 'top'>>()
	})
})
