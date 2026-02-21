// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '@voltiso/util'
import { describe, expect, it } from 'vitest'

import type { IsReactNative } from '~'

describe('isWeb', () => {
	it('works', () => {
		expect.assertions(0)

		$Assert.is<IsReactNative, false>()
	})
})
