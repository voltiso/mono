// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '_'

import type { IsIdentical } from '~/type'

import type { Length } from './Length'

describe('Length', () => {
	it('simple', () => {
		expect.assertions(0)

		type A = Length<[]>
		$Assert<IsIdentical<A, 0>>()

		type B = Length<readonly [1, 2]>
		$Assert<IsIdentical<B, 2>>()
	})
})
