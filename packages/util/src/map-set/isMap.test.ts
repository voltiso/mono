// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from 'vitest'

import { isMap } from './isMap'

describe('isMap', () => {
	it('works', () => {
		expect.hasAssertions()

		expect(isMap(new Set())).toBeFalsy()
		expect(isMap(new Map())).toBeTruthy()
		expect(isMap(new Date())).toBeFalsy()

		expect(isMap({})).toBeFalsy()
		expect(isMap(null)).toBeFalsy()
		expect(isMap(undefined)).toBeFalsy()

		expect(isMap(Object.setPrototypeOf({}, null))).toBeFalsy()
	})
})
