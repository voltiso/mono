// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import type { GetOtherDirection } from './getOtherDirection'
import { getOtherDirection } from './getOtherDirection'

describe('getOtherDirection', () => {
	it('works', () => {
		expect.hasAssertions()

		expect(getOtherDirection('left')).toBe('right')

		$Assert<IsIdentical<GetOtherDirection<'left'>, 'right'>>()
	})
})
