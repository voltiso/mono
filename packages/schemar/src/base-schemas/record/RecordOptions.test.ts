// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import { $Assert } from '@voltiso/util'

import type { RecordOptions } from './RecordOptions'

describe('RecordOptions', () => {
	it('type', () => {
		expect.assertions(0)

		$Assert.is<RecordOptions.Default, RecordOptions>()
	})
})
