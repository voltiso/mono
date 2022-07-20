// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { Assert } from '../type'
import type {
	PartialSyncerSwitch,
	SyncerSwitch,
	SyncerSwitchAsync,
	SyncerSwitchSync,
} from './SyncerSwitch.js'

describe('SyncerSwitch', () => {
	it('type', () => {
		expect.assertions(0)

		Assert.is<SyncerSwitchAsync<number>, SyncerSwitchAsync>()
		Assert.is<SyncerSwitchSync<number>, SyncerSwitchSync>()

		Assert.is<SyncerSwitch<number>, SyncerSwitch>()
		Assert.is<PartialSyncerSwitch<number>, PartialSyncerSwitch>()

		Assert.is<SyncerSwitch<number>, PartialSyncerSwitch>()
	})
})
