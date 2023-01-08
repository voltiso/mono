// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '~/$strip'

import type { SyncerNested } from './SyncerNested'

describe('SyncerNested', () => {
	it('type', () => {
		expect.assertions(0)

		$Assert.is<SyncerNested<number>, SyncerNested>()
	})
})
