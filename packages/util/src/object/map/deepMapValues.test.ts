// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '_'
import { describe, expect, it } from '@jest/globals'

import type { IsIdentical } from '~/type'

import { deepMapValues } from './deepMapValues'

describe('deepMapValues', () => {
	it('simple', () => {
		expect.hasAssertions()

		const obj = {
			arr: [1, 2, { a: 3 }],
			field: 4,
		} as const

		const mapped = deepMapValues(obj, (x: number) => 2 * x)

		expect(mapped).toStrictEqual({
			arr: [2, 4, { a: 6 }],
			field: 8,
		})

		$Assert<
			IsIdentical<
				typeof mapped,
				{
					readonly arr: readonly [number, number, { readonly a: number }]
					readonly field: number
				}
			>
		>()
	})
})
