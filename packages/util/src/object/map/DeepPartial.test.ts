// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '../../type'
import { Assert } from '../../type'
import type { DeepPartial } from './DeepPartial.js'

describe('DeepPartial', () => {
	it('works', () => {
		expect.assertions(0)

		type X = DeepPartial<{
			x: 0
			a: 1
			obj: {
				a: 11
			}
		}>
		Assert<
			IsIdentical<
				X,
				{
					x?: 0
					a?: 1
					obj?: {
						a?: 11
					}
				}
			>
		>()
	})
})
