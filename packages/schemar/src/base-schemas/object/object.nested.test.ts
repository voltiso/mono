// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'

import * as s from '~'

describe('object', () => {
	it('nested explicit object', () => {
		expect.hasAssertions()

		const sUser = s.object({
			profile: s.object({
				role: s.string,
			}),
		})

		expect(sUser.validate({ profile: { role: 'test' } })).toStrictEqual({
			profile: { role: 'test' },
		})
	})
})
