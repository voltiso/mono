// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { Assert, undef } from '@voltiso/util'

import type { OutputType } from '~'
import * as s from '~'

describe('undefined', () => {
	it('simple', () => {
		expect.hasAssertions()

		type A = OutputType<typeof s.undefined>
		Assert<IsIdentical<A, undefined>>()

		expect(s.undefined.extends(s.unknown)).toBeTruthy()
		expect(s.literal(undef).extends(s.unknown)).toBeTruthy()
		expect(s.schema(undef).extends(s.unknown)).toBeTruthy()

		expect(s.undefined.extends(s.undefined)).toBeTruthy()
		expect(s.undefined.extends(undef)).toBeTruthy()

		expect(s.undefined.extends(s.null)).toBeFalsy()
		expect(s.null.extends(s.undefined)).toBeFalsy()

		expect(s.undefined.extends(s.number)).toBeFalsy()
		expect(s.undefined.extends(s.never)).toBeFalsy()

		expect(s.never.extends(s.undefined)).toBeTruthy()
		expect(s.never.extends(undef)).toBeTruthy()
	})
})
