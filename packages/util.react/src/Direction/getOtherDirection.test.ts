// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { Assert } from '@voltiso/util'

import type { GetOtherDirection } from './getOtherDirection.js'
import { getOtherDirection } from './getOtherDirection.js'

describe('getOtherDirection', () => {
	it('works', () => {
		expect.hasAssertions()

		expect(getOtherDirection('left')).toBe('right')

		Assert<IsIdentical<GetOtherDirection<'left'>, 'right'>>()
	})
})
