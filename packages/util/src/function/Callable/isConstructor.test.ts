// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { areArrowFunctionsTranspiled } from '../../misc'
import { isConstructor } from './isConstructor.js'

describe('isConstructor', () => {
	it('areArrowFunctionsTranspiled is false', () => {
		expect.hasAssertions()

		expect(areArrowFunctionsTranspiled).toBeFalsy()
	})

	it('works', () => {
		expect.hasAssertions()

		expect(isConstructor(Date)).toBeTruthy()

		if (!areArrowFunctionsTranspiled) {
			// eslint-disable-next-line jest/no-conditional-expect
			expect(isConstructor(() => 0)).toBeFalsy()
		}

		expect(isConstructor(function () {})).toBeTruthy()
	})
})
