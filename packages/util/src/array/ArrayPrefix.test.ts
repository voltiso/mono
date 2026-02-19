// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '_'
import { describe, expect, it } from '@jest/globals'

import type { IsIdentical } from '~/type'

import type { ArrayPrefix } from './ArrayPrefix'

describe('ArrayPrefix', () => {
	it('works', () => {
		expect.assertions(0) // type-only

		type A = ArrayPrefix<[]>
		$Assert<IsIdentical<A, []>>()

		type B = ArrayPrefix<[1, 2, 3]>
		$Assert<IsIdentical<B, [] | [1] | [1, 2] | [1, 2, 3]>>()

		// TODO

		// type C = ArrayPrefix<[1, ...unknown[], 2]>
		// $Assert<IsIdentical<C, [] | [1] | [1, ...unknown[]] | [1, unknown[], 2]>>()
	})
})
