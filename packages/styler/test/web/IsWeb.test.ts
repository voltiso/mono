// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import { $Assert } from '@voltiso/util'

import type { IsReactNative } from '~'

describe('isWeb', () => {
	// eslint-disable-next-line jest/prefer-ending-with-an-expect
	it('works', () => {
		expect.assertions(0)

		$Assert.is<IsReactNative, false>()
	})
})
