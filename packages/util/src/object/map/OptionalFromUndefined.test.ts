// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '~'
import { $Assert } from '~/$strip'

import type { OptionalFromUndefined } from './OptionalFromUndefined'

describe('OptionalFromUndefined', () => {
	it('works', () => {
		expect.assertions(0)

		$Assert<
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

		$Assert<
			IsIdentical<
				OptionalFromUndefined<{
					a: undefined
				}>,
				{ a?: never }
			>
		>()
	})
})
