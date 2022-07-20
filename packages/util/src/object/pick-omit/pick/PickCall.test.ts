// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '../../../type'
import { Assert } from '../../../type'
import type { PickCallNoUnknown } from './PickCall.js'

describe('PickCall', () => {
	it('PickCallNoUnknown', () => {
		expect.assertions(0)

		type X = PickCallNoUnknown<{
			new (x: number): string
			(x: number): number
			[k: string]: number
			num: number
		}>
		Assert<
			IsIdentical<
				X,
				{
					(x: number): number
				}
			>
		>()
	})
})
