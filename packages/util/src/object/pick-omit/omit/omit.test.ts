// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'

import { omit } from './omit'

describe('omit', () => {
	it('throws on non-existing keys', () => {
		expect.hasAssertions()

		const obj = {
			a: 1 as const,
			b: 2 as const,
		}

		// @ts-expect-error 'c' does not exist
		expect(() => omit(obj, 'c')).toThrow('does not exist')

		expect(omit(obj, 'b')).toStrictEqual({ a: 1 })
		expect(obj).toStrictEqual({ a: 1, b: 2 })
	})
})
