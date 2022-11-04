// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '~/$strip'

import type { ExcludeEmptyBraces, ExtractEmptyBraces, IsIdentical } from '.'

describe('EmptyBraces', () => {
	it('type', () => {
		expect.assertions(0)

		type A = ExtractEmptyBraces<
			{} | 1 | null | 'a' | { a: 1 } | void | never | object
		>

		$Assert<IsIdentical<A, {}>>()

		//

		type B = ExcludeEmptyBraces<
			{} | 1 | null | 'a' | { a: 1 } | void | never | object
		>

		$Assert<IsIdentical<B, 1 | null | 'a' | { a: 1 } | void | object>>()
	})
})
