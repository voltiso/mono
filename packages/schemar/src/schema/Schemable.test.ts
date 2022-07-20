// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { Assert } from '@voltiso/util'

import type { Inferable, RootSchemable } from './Schemable.js'

describe('Schemable', () => {
	it('type', () => {
		expect.assertions(0)

		Assert.is<RootSchemable[], Inferable>()
		Assert.is<readonly RootSchemable[], Inferable>()
	})
})
