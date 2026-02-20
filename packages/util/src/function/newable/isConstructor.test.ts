// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
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
			expect(isConstructor(() => 0)).toBeFalsy()
		}

		// biome-ignore lint/complexity/useArrowFunction: .
		expect(isConstructor(function () {})).toBeTruthy()
	})
})
