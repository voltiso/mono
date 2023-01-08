// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical, StaticError } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import * as s from '~'

describe('literal', () => {
	it('type cast', () => {
		const a = s.literal(1, 2)

		const b = a.Narrow<1>()

		$Assert<IsIdentical<typeof b.Output, 1>>()
		$Assert<IsIdentical<typeof b.Input, 1>>()

		const c = a.Widen<2 | 3>()
		$Assert.is<typeof c, StaticError>()

		const d = a.Widen<1>()
		$Assert.is<typeof d, StaticError>()

		const e = a.Widen<1 | 2 | 3>()
		$Assert<IsIdentical<typeof e.Output, 1 | 2 | 3>>()
	})
})
