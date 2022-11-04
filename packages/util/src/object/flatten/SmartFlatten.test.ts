// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '~/$strip'
import type { IsEqual, IsIdentical } from '~/type'

import type { SmartFlatten } from './SmartFlatten'

describe('smartFlatten', () => {
	it('works', () => {
		expect.assertions(0)

		$Assert<IsIdentical<SmartFlatten<{ a: 1 } & { b: 2 }>, { a: 1; b: 2 }>>()

		$Assert<IsEqual<SmartFlatten<{ a?: 1 }>, { a?: 1 }>>()

		$Assert.is<IsEqual<SmartFlatten<{ a?: 1 | undefined }>, { a?: 1 }>, false>()

		$Assert.is<SmartFlatten<number>, number>()

		$Assert.is<SmartFlatten<string>, string>()

		$Assert.is<SmartFlatten<Date>, Date>()

		$Assert.is<SmartFlatten<typeof Date>, typeof Date>()

		type Rec = Rec[] | string

		$Assert<IsIdentical<SmartFlatten<Rec>, Rec>>()
	})
})
