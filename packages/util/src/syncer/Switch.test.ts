// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { Assert } from '../type'
import type { SyncerSwitch } from './SyncerSwitch.js'

describe('SyncerSwitch', () => {
	it('generic', <X>() => {
		expect.assertions(0)

		Assert.is<SyncerSwitch<X>, SyncerSwitch>()
	})

	it('type', () => {
		expect.assertions(0)

		Assert.is<
			{ async: () => Promise<Promise<0>>; sync: () => 0 },
			SyncerSwitch
		>()
	})
})
