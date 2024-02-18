// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { $Assert, isDate } from '@voltiso/util'

import * as s from '~'

describe('fix', () => {
	it('schema condition', () => {
		const a = s.date.fix(s.string, value => new Date(value))

		$Assert<
			IsIdentical<
				typeof a,
				s.CustomInstance$<{ Output: Date; Input: Date | string }>
			>
		>()

		expect(a.validate('2021-01-01')).toStrictEqual(new Date('2021-01-01'))
	})

	it('predicate type-guard condition', () => {
		const a = s.string.fixIf(isDate, value => value.toISOString())
		$Assert<
			IsIdentical<
				typeof a,
				s.CustomString$<{
					Input: string | Date
				}>
			>
		>()
	})

	it('raw predicate condition', () => {
		const a = s.string.fixIf<Date>(
			value => isDate(value),
			value => value.toISOString(),
		)

		$Assert<
			IsIdentical<
				typeof a,
				s.CustomString$<{
					Input: string | Date
				}>
			>
		>()
	})

	it('raw predicate argument - missing explicit type argument', () => {
		const a = s.string.fixIf(
			(value: unknown) => isDate(value),
			(value: Date) => value.toISOString(),
		)

		$Assert<
			IsIdentical<
				typeof a,
				s.CustomString$<{
					Input: string | Date
				}>
			>
		>()
	})

	it('invalid result', () => {
		const a = s.string.fix(s.string, value => value.length as never)

		expect(() => a.validate('test')).toThrow('should be string (got 4)')
	})
})
