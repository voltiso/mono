// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { Assert } from '@voltiso/util'

import type { defaultDocDerivedData, DocDerivedData } from './DocDerivedData.js'

describe('DocDerivedData', () => {
	it('works (static)', () => {
		expect.assertions(0)

		Assert.isSubtype<typeof defaultDocDerivedData, DocDerivedData>()
	})
})
