// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '~/$strip'

import type {
	PartialSyncerSwitch,
	SyncerSwitch,
	SyncerSwitchAsync,
	SyncerSwitchSync,
} from './SyncerSwitch'

describe('SyncerSwitch', () => {
	it('type', () => {
		expect.assertions(0)

		$Assert.is<SyncerSwitchAsync<number>, SyncerSwitchAsync>()
		$Assert.is<SyncerSwitchSync<number>, SyncerSwitchSync>()

		$Assert.is<SyncerSwitch<number>, SyncerSwitch>()
		$Assert.is<PartialSyncerSwitch<number>, PartialSyncerSwitch>()

		$Assert.is<SyncerSwitch<number>, PartialSyncerSwitch>()
	})
})
