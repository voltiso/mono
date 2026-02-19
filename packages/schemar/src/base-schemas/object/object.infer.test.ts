// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, it } from '@jest/globals'
import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import * as s from '~'

describe('infer object - readonly', () => {
	it('works', () => {
		const mySchema = s.infer({
			a: {
				b: [{ c: s.number }] as const,
			},
		})

		type A = typeof mySchema.Output

		$Assert<IsIdentical<A, { a: { b: readonly [{ readonly c: number }] } }>>() // ! hmm
	})
})
