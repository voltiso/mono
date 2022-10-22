// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '~'
import { $Assert } from '~/$strip'

import type { OmitValues } from './OmitValues'

describe('OmitValues', () => {
	it('works', () => {
		expect.assertions(0)

		type X = OmitValues<
			{
				fff: never
				ggg?: never
				num: number
			},
			undefined
		>

		$Assert<IsIdentical<X, { num: number }>>()
	})
})
