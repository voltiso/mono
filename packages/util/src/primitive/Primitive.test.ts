// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'

import { isPrimitive } from './Primitive'

describe('Primitive', () => {
	it('works', () => {
		expect.hasAssertions()
		expect(isPrimitive('a')).toBeTruthy()
		expect(isPrimitive(1)).toBeTruthy()
		// eslint-disable-next-line unicorn/prefer-bigint-literals
		expect(isPrimitive(BigInt(123))).toBeTruthy()
		expect(isPrimitive(Symbol('dfg'))).toBeTruthy()
		expect(isPrimitive(undefined)).toBeTruthy()
		expect(isPrimitive(false)).toBeTruthy()
		expect(isPrimitive({})).toBeFalsy()
		expect(isPrimitive(() => {})).toBeFalsy()
	})
})
