// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '~/$strip'
import type { IsIdentical } from '~/type'

import { nest } from './nest'

describe('Nest', () => {
	it('works', () => {
		expect.hasAssertions()

		const a = nest(123, [] as const)

		expect(a).toBe(123)

		$Assert<IsIdentical<typeof a, 123>>()

		const x = nest(123, ['a', 'b', 3] as const)

		expect(x).toStrictEqual({ a: { b: { 3: 123 } } })

		$Assert<IsIdentical<typeof x, { a: { b: { [3]: 123 } } }>>()
	})
})
