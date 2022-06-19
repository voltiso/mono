import type { IsIdentical } from './compare'
import type { OptionalFromUndefined } from './OptionalFromUndefined'
import { SimpleAssert } from './SimpleAssert'

describe('OptionalFromUndefined', () => {
	it('works', () => {
		expect.assertions(0)

		SimpleAssert<
			IsIdentical<
				OptionalFromUndefined<{
					a: number
					b: string | undefined
					c?: string
					d?: string | undefined
				}>,
				{ a: number; b?: string; c?: string; d?: string }
			>
		>()

		SimpleAssert<
			IsIdentical<
				OptionalFromUndefined<{
					a: undefined
				}>,
				{ a?: never }
			>
		>()
	})
})
