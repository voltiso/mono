// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '~/$strip'
import type { IsIdentical } from '~/type'

import type { DeepPartialOrUndefined_ } from './DeepPartialOrUndefined'

describe('DeepPartialOrUndefined', () => {
	it('works', () => {
		expect.assertions(0)

		type X = DeepPartialOrUndefined_<{
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
