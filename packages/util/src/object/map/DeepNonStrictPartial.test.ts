// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '_'

import type { IsIdentical } from '~/type'

import type { DeepNonStrictPartial_ } from './DeepNonStrictPartial'

describe('DeepNonStrictPartial', () => {
	it('works', () => {
		expect.assertions(0)

		type X = DeepNonStrictPartial_<{
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
					x?: 0 | undefined
					a?: 'test' | undefined
					arr?: 123[] | undefined
					obj?:
						| {
								a?: 11 | undefined
						  }
						| undefined
				}
			>
		>()
	})
})
