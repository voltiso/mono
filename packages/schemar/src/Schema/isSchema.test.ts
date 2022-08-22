// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '~'

import { isSchema } from './isSchema'

describe('isSchema', () => {
	it('works with lazyValue', () => {
		expect.hasAssertions()

		expect(isSchema(s.object)).toBeTruthy()
	})
})
