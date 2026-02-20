// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'

import { isCallable, isNewable } from './isFunction'

describe('isFunction', () => {
	it('isNewable', () => {
		expect(isNewable(123)).toBe(false)
		expect(isNewable(() => {})).toBe(false)

		// biome-ignore lint/complexity/useArrowFunction: .
		expect(isNewable(function () {})).toBe(true) // !!!
		expect(isNewable(Symbol)).toBe(true) // !!!
	})

	it('isCallable', () => {
		expect(isCallable(123)).toBe(false)
		expect(isCallable(() => {})).toBe(true)

		// biome-ignore lint/complexity/useArrowFunction: .
		expect(isCallable(function () {})).toBe(true) // !!!
		expect(isCallable(Symbol)).toBe(true) // !!!
	})
})
