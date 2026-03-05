// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from 'vitest'

import { isSet } from './isSet'

describe('isSet', () => {
	it('works', () => {
		expect.hasAssertions()

		expect(isSet(new Set())).toBeTruthy()
		expect(isSet(new Map())).toBeFalsy()
		expect(isSet(new Date())).toBeFalsy()

		expect(isSet({})).toBeFalsy()
		expect(isSet(null)).toBeFalsy()
		expect(isSet(undefined)).toBeFalsy()

		expect(isSet(Object.setPrototypeOf({}, null))).toBeFalsy()
	})
})
