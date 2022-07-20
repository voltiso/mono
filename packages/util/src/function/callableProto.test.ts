// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { callable } from './callableProto.js'

describe('callable', () => {
	it('works', () => {
		expect.hasAssertions()

		const a = callable({ a: 1 }, (n: number) => 2 * n)

		expect(a.a).toBe(1)
		expect(a(2)).toBe(4)
	})

	it('proxy', () => {
		expect.hasAssertions()

		const a = callable(
			new Proxy(
				{},
				{
					get(_t, p) {
						return p
					},
				},
			),
			(x: number) => 2 * x,
		)

		expect(a(2)).toBe(4)
		// @ts-expect-error no `test`
		expect(a.test).toBe('test')
	})
})
