// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import type { IsReactNative } from '@voltiso/styler'
import { $Assert } from '@voltiso/util'

describe('IsReactNative', () => {
	it('works', () => {
		expect.assertions(0)

		$Assert.is<IsReactNative, true>()
	})
})
