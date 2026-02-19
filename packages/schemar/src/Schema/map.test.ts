// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import * as s from '~'

describe('map', () => {
	it('raw predicate condition', () => {
		const a = s.string.mapIf(
			value => value.startsWith('_'),
			value => value.slice(1),
		)
		$Assert<IsIdentical<typeof a, s.String$>>()

		expect(a.validate('test')).toBe('test')
		expect(a.validate('_test')).toBe('test')

		const b = s.string.mapIf(
			value => value.startsWith('_'),
			value => Number(value.slice(1)),
		)
		$Assert<
			IsIdentical<typeof b, s.CustomString$<{ Output: string | number }>>
		>()

		expect(b.validate('123')).toBe('123')
		expect(b.validate('_123')).toBe(123)
	})
})
