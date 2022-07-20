// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { Assert } from '../type'
import type { ISyncerIterator, SyncerIterator } from './SyncerIterator.js'

describe('SyncerIterator', () => {
	it('type', () => {
		expect.assertions(0)

		Assert.is<SyncerIterator<string, number>, ISyncerIterator>()
		Assert.is<SyncerIterator<string, number>, ISyncerIterator<string>>()
	})
})
