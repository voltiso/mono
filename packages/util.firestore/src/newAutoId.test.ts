// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'

import { newAutoId } from './newAutoId'

describe('newAutoId', () => {
	it('works', () => {
		expect.hasAssertions()

		const id = newAutoId()

		expect(id).toHaveLength(20)
	})
})
