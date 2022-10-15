// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from './compare'
import { define } from './define'
import { Assert } from './static-assert'

describe('define', () => {
	it('simple', () => {
		expect.hasAssertions()

		type Theme = {
			a: {
				b: {
					c: number
				}
			}
		}

		const arg = { a: { b: { c: 123 } } } as const

		const a = define<Theme>().value(arg)
		Assert<IsIdentical<typeof a, { a: { b: { c: 123 } } }>>()

		expect(a).toBe(arg)

		// @ts-expect-error wrong type
		define<Theme>().value({ a: { b: { c: 'test' } } })
	})
})
