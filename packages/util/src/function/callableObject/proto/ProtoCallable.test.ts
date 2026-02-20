// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'

import { ProtoCallable } from './ProtoCallable'

describe('callable', () => {
	it('works', () => {
		expect.hasAssertions()

		const a = ProtoCallable({
			call: (n: number) => 2 * n,
			prototype: { a: 1 },
		})

		expect(a.a).toBe(1)
		expect(a(2)).toBe(4)
	})

	it('proxy', () => {
		expect.hasAssertions()

		const a = ProtoCallable({
			call: (x: number) => 2 * x,

			prototype: new Proxy(
				{},
				{
					get(_t, p) {
						return p
					},
				},
			),
		})

		expect(a(2)).toBe(4)
		// @ts-expect-error no `test`
		expect(a.test).toBe('test')
	})
})
