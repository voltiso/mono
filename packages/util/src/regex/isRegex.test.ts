// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { isRegex } from './isRegex'

describe('isRegex', () => {
	it('null proto', () => {
		expect.hasAssertions()

		expect(isRegex(Object.setPrototypeOf({}, null))).toBeFalsy()
	})
})
