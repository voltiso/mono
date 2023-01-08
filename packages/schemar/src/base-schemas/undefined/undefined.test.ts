// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import type { Output } from '~'
import * as s from '~'

describe('undefined', () => {
	it('simple', () => {
		expect.hasAssertions()

		type A = Output<typeof s.undefined>
		$Assert<IsIdentical<A, undefined>>()

		expect(s.undefined.extends(s.unknown)).toBeTruthy()
		expect(s.literal(undefined).extends(s.unknown)).toBeTruthy()
		expect(s.schema(undefined).extends(s.unknown)).toBeTruthy()

		expect(s.undefined.extends(s.undefined)).toBeTruthy()
		expect(s.undefined.extends(undefined)).toBeTruthy()

		expect(s.undefined.extends(s.null)).toBeFalsy()
		expect(s.null.extends(s.undefined)).toBeFalsy()

		expect(s.undefined.extends(s.number)).toBeFalsy()
		expect(s.undefined.extends(s.never)).toBeFalsy()

		expect(s.never.extends(s.undefined)).toBeTruthy()
		expect(s.never.extends(undefined)).toBeTruthy()
	})
})
