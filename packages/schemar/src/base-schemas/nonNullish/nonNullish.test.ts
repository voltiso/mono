// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import type { InferSchema, NonNullish } from '~'
import * as s from '~'

describe('nonNullish', () => {
	it('works', () => {
		expect(() => s.nonNullish.validate(null)).toThrow(
			'should be non-nullish (got null)',
		)

		expect(() => s.nonNullish.validate(undefined)).toThrow(
			'should be non-nullish (got undefined)',
		)

		expect(s.nonNullish.validate({ a: 1 })).toStrictEqual({ a: 1 })
		expect(s.nonNullish.validate('test')).toBe('test')
		expect(s.nonNullish.validate(123)).toBe(123)

		expect(s.nonNullish.toString()).toBe('{}')

		expect(s.infer({}).toString()).toBe('{}')

		$Assert<IsIdentical<typeof s.nonNullish, NonNullish>>()

		type A = InferSchema<{}>
		$Assert<IsIdentical<A, NonNullish>>()
	})
})