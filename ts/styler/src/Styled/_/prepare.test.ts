// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from 'vitest'

import { prepare } from './prepare'

describe('prepare', () => {
	it('preserves nested order', () => {
		expect(
			Object.entries(
				prepare(
					{
						a: 0,

						_: {
							b: 1,
						},
					} as never,
					{ theme: {} },
				),
			),
		).toStrictEqual([
			['a', 0],
			['b', 1],
		])

		expect(
			Object.entries(
				prepare(
					{
						_: {
							b: 1,
						},

						a: 0,
					} as never,
					{ theme: {} },
				),
			),
		).toStrictEqual([
			['b', 1],
			['a', 0],
		])
	})
})
