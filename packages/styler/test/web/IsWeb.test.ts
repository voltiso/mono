// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import { $Assert } from '@voltiso/util'

import type { IsReactNative } from '~'

describe('isWeb', () => {
	it('works', () => {
		expect.assertions(0)

		$Assert.is<IsReactNative, false>()
	})
})
