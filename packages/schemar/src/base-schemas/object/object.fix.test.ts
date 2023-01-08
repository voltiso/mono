// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '~'
import { InvalidFixError } from '~/error/InvalidFixError'

describe('object', () => {
	describe('fix', () => {
		it('simple', () => {
			const a = s
				.infer({
					field: s.string,
				})
				.fix(value => {
					/**
					 * Should never be called with `undefined`, because `undefined` does
					 * not extend the Output type
					 */
					expect(value).toBeDefined()

					if (value.field === 'oops') return 123 as never // crash

					if (value.field === '') return { ...value, field: '<unknown>' }
					else return undefined // no change
				})

			expect(() => a.validate(undefined)).toThrow(
				'should be object (got undefined)',
			)

			expect(() => a.validate({})).toThrow('.field should be present')

			expect(a.validate({ field: 'test' })).toStrictEqual({ field: 'test' })

			expect(a.validate({ field: '' })).toStrictEqual({ field: '<unknown>' })

			expect(() => a.validate({ field: 'oops' })).toThrow(InvalidFixError)
		})

		it('catch errors', () => {
			const a = s.string.fix(_str => {
				throw new Error('inner')
			})

			let error: unknown
			try {
				a.validate('test')
			} catch (error_) {
				error = error_
			}

			expect(error).toMatchObject({
				name: 'SchemarError',
				message: expect.stringContaining('Custom fix failed'),

				cause: {
					message: 'inner',
				},
			})
		})
	})
})
