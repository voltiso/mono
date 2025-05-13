// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import type { Output } from '~'
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
