// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { Assert } from '@voltiso/util'

import type { IsReactNative } from '../../src/IsReactNative.js'

describe('isWeb', () => {
	it('works', () => {
		expect.assertions(0)

		Assert.is<IsReactNative, false>()
	})
})
