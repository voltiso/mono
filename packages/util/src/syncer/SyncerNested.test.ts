// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '_'
import { describe, expect, it } from '@jest/globals'

import type { SyncerNested } from './SyncerNested'

describe('SyncerNested', () => {
	it('type', () => {
		expect.assertions(0)

		$Assert.is<SyncerNested<number>, SyncerNested>()
	})
})
