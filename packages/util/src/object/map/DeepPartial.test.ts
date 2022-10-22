// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '~/$strip'
import { $Assert } from '~/$strip'

import type { DeepPartial_ } from './DeepPartial'

describe('DeepPartial', () => {
	it('works', () => {
		expect.assertions(0)

		type X = DeepPartial_<{
			x: 0
			a: 'test'
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
					obj?: {
						a?: 11
					}
				}
			>
		>()
	})
})
