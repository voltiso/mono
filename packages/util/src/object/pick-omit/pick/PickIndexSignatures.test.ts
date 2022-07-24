// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '../../../type'
import { Assert } from '../../../type'
import type { PickIndexSignatures } from './PickIndexSignatures.js'

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
		Assert<
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