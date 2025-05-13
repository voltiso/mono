// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'

import { areArrowFunctionsTranspiled } from '~/misc/areArrowFunctionsTranspiled'

import { isConstructor } from './isConstructor'

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
