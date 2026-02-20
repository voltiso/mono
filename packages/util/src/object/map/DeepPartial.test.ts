// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import { $Assert } from '_'

import type { IsIdentical } from '~/type'

import type { DeepPartial_ } from './DeepPartial'

describe('DeepPartial', () => {
	it('works', () => {
		expect.assertions(0)

		type X = DeepPartial_<{
			x: 0
			a: 'test'
			arr: 123[]
			obj: {
				a: 11
			}
		}>
		$Assert<
			IsIdentical<
				X,
				{
					x?: 0
					a?: 'test'
					arr?: 123[]
					obj?: {
						a?: 11
					}
				}
			>
		>()
	})
})
