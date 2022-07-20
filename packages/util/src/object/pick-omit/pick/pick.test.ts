// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '../../../type'
import { Assert } from '../../../type'
import { pick } from './pick.js'

describe('pick', () => {
	it('throws on non-existing keys', () => {
		expect.hasAssertions()

		const obj = {
			a: 1,
			b: 2,
		} as { a?: 1; b?: 2 }

		// @ts-expect-error 'c' does not exist
		expect(() => pick(obj, 'c')).toThrow('property not found')

		const r = pick(obj, 'b')

		expect(r).toStrictEqual({ b: 2 })
		expect(obj).toStrictEqual({ a: 1, b: 2 })

		Assert<IsIdentical<typeof r, { b: 2 }>>()
	})
})
