// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '_'
import { describe, expect, it } from 'vitest'

import type { IsIdentical } from '~/type'

import type { PickIndexSignatures } from './PickIndexSignatures'

describe('PickIndexSignatures', () => {
	it('works', () => {
		expect.assertions(0)

		type X = PickIndexSignatures<{
			new (x: number): number
			(x: number): number
			[k: string]: number
			[k: number]: 123
			[k: symbol]: 'asd'
			num: number
		}>
		$Assert<
			IsIdentical<
				X,
				{
					[k: string]: number
					[k: number]: 123
					[k: symbol]: 'asd'
				}
			>
		>()
	})
})
