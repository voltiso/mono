// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '~'

import { isSchema } from './isSchema'

describe('isSchema', () => {
	it('works with lazyObject', () => {
		expect.hasAssertions()

		expect(isSchema(s.object)).toBeTruthy()
	})
})
