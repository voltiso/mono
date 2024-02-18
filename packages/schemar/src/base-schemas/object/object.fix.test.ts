// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical, StaticError } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import * as s from '~'

describe('object', () => {
	describe('map', () => {
		it('simple', () => {
			const bad = s.unknown.fix(() => {})
			$Assert.is<typeof bad, StaticError>()

			const aa = s.infer({
				field: s.string,
			})

			const a = aa.narrow(value => {
				/**
				 * Should never be called with `undefined`, because `undefined` does not
				 * extend the Output type
				 */
				expect(value).toBeDefined()

				if (value.field === 'oops') return 123 as never // crash

				if (value.field === '') return { ...value, field: '<unknown>' }
				else return value // no change
			})

			expect(() => a.validate(undefined)).toThrow(
				'should be object (got undefined)',
			)

			expect(() => a.validate({})).toThrow('.field should be present')

			expect(a.validate({ field: 'test' })).toStrictEqual({ field: 'test' })

			expect(a.validate({ field: '' })).toStrictEqual({ field: '<unknown>' })

			// expect(() => a.validate({ field: 'oops' })).toThrow(InvalidFixError)
		})

		it('catch errors', () => {
			const a = s.string.map(_str => {
				throw new Error('inner')
			})

			$Assert<
				IsIdentical<
					typeof a,
					s.CustomString$<{
						Output: never
					}>
				>
			>()

			let error: unknown
			try {
				a.validate('test')
			} catch (error_) {
				error = error_
			}

			expect(error).toMatchObject({
				name: 'SchemarError',
				message: expect.stringContaining('Custom transform failed'),

				cause: {
					message: 'inner',
				},
			})
		})
	})
})
