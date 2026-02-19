// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'

import * as s from '~'

describe('object', () => {
	describe('best-effort', () => {
		it('simple', () => {
			const a = s.object({
				def: s.string.default('def'),
				str: s.string,
			})

			expect(() => a.validate({})).toThrow('.str should be present')

			expect(() => a.validate(undefined)).toThrow(
				'should be object (got undefined)',
			)

			expect(() => a.validate(null)).toThrow('should be object (got null)')

			expect(() => a.validate(123)).toThrow('should be object (got 123)')

			//

			expect(a.exec({}).value).toStrictEqual({ def: 'def' })
			expect(a.tryValidate({})).toStrictEqual({ def: 'def' })

			expect(a.exec({ test: 3 }).value).toStrictEqual({ def: 'def', test: 3 }) // !
			expect(a.tryValidate({ test: 3 })).toStrictEqual({ def: 'def', test: 3 }) // !

			// expect(a.exec(undefined).value).toStrictEqual({ def: 'def' }) // !
			// expect(a.tryValidate(undefined)).toStrictEqual({ def: 'def' }) // !
		})
	})
})
