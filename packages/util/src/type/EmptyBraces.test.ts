import { $Assert } from '~/$strip'
import type { ExtractEmptyBraces, IsIdentical, ExcludeEmptyBraces } from '.'

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
