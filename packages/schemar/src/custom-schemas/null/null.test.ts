// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Output } from '@voltiso/schemar.types'
import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import * as s from '~'

describe('null', () => {
	it('simple', () => {
		expect.hasAssertions()

		type A = Output<typeof s.null>
		$Assert<IsIdentical<A, null>>()

		expect(s.null.extends(s.null)).toBeTruthy()
		expect(s.null.extends(null)).toBeTruthy()

		expect(s.null.extends(s.number)).toBeFalsy()
		expect(s.null.extends(s.unknown)).toBeTruthy()

		expect(s.null.extends(s.never)).toBeFalsy()
	})
})
