// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '~'
import { Assert } from '~/type'

import type { OmitCall } from './OmitCall'

describe('OmitCall', () => {
	it('works', () => {
		expect.assertions(0)

		type X = OmitCall<{
			new (x: number): number
			(x: number): number
			[k: string]: number
			num: number
		}>

		Assert<IsIdentical<X, { [k: string]: number; num: number }>>()
	})
})
