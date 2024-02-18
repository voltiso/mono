// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '_'

import type { IsIdentical } from '~/type'

import type { Override } from './Override'
import { override, overrideDefined } from './Override'

describe('override', () => {
	it('type', () => {
		type A = Override<{ a: 1 }, { a: 2 }>
		$Assert<IsIdentical<A, { a: 2 }>>()

		type B = Override<{ a: 1 }, {}>
		$Assert<IsIdentical<B, { a: 1 }>>()
	})

	it('optionals', () => {
		const a = override({ a: 1 as const }, { a: 2 as const })

		expect(a).toStrictEqual({ a: 2 })

		$Assert<IsIdentical<typeof a, { a: 2 }>>()

		const b = override({ a: 1 }, { a: undefined })

		expect(b).toStrictEqual({ a: undefined })

		$Assert<IsIdentical<typeof b, { a: undefined }>>()
	})

	it('non-strict optionals', () => {
		const a = overrideDefined({ a: 1 as const }, { a: 2 as const })

		expect(a).toStrictEqual({ a: 2 })

		$Assert<IsIdentical<typeof a, { a: 2 }>>()

		const b = overrideDefined({ a: 1 }, { a: undefined })

		expect(b).toStrictEqual({ a: 1 })

		$Assert<IsIdentical<typeof b, { a: number }>>()
	})
})
