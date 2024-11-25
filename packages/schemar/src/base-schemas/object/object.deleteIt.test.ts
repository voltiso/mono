// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'

import * as s from '~'

describe('object', () => {
	describe('delete field', () => {
		it('fix', () => {
			const sMyString = s.string.optional.fix('test', () => undefined)

			expect(() => sMyString.validate('test')).toThrow(
				'should be string (got undefined)',
			)
			expect(sMyString.validate('x')).toBe('x')

			const a = s.object({ a: sMyString })

			expect(a.validate({ a: 'test' })).toStrictEqual({})
			expect(a.validate({ a: 'x' })).toStrictEqual({ a: 'x' })
		})

		it('map', () => {
			const sMyString = s.string.optional.map('test', () => undefined)

			expect(sMyString.validate('test')).toBeUndefined()

			expect(sMyString.validate('x')).toBe('x')

			const a = s.object({ a: sMyString })

			expect(a.validate({ a: 'test' })).toStrictEqual({})
			expect(a.validate({ a: 'x' })).toStrictEqual({ a: 'x' })
		})
	})
})
