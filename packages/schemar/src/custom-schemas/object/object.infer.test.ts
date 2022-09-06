// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { Assert } from '@voltiso/util'

import * as s from '~'

describe('infer object - readonly', () => {
	it('works', () => {
		expect.assertions(0)

		const mySchema = s.infer({
			a: {
				b: [{ c: s.number }] as const,
			},
		})

		type A = typeof mySchema.OutputType

		Assert<IsIdentical<A, { a: { b: readonly [{ readonly c: number }] } }>>() //! hmm
	})
})
