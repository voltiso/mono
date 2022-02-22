import { Assert } from '../assert'
import { IsIdentical } from '../IsEqual'
import { PartialFromUndefined } from './PartialFromUndefined'

describe('partialFromUndefined', () => {
	it('works', () => {
		expect.assertions(0)

		Assert<
			IsIdentical<
				PartialFromUndefined<{
					a: number
					b: string | undefined
					c?: string
					d?: string | undefined
				}>,
				{ a: number; b?: string; c?: string; d?: string }
			>
		>()

		Assert<
			IsIdentical<
				PartialFromUndefined<{
					a: undefined
				}>,
				{ a?: never }
			>
		>()
	})
})
