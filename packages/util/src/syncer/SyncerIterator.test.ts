// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '_'

import type { ISyncerPromise, SyncerPromise } from './SyncerPromise'

describe('SyncerIterator', () => {
	it('type', () => {
		expect.assertions(0)

		$Assert.is<SyncerPromise<string, number>, ISyncerPromise>()
		$Assert.is<SyncerPromise<string, number>, ISyncerPromise<string>>()
	})
})
