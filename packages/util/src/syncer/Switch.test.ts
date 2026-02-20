// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import { $Assert } from '_'

import type { SyncerSwitch } from './SyncerSwitch'

describe('SyncerSwitch', () => {
	it('generic', <X>() => {
		expect.assertions(0)

		$Assert.is<SyncerSwitch<X>, SyncerSwitch>()
	})

	it('type', () => {
		expect.assertions(0)

		$Assert.is<
			{ async: () => Promise<Promise<0>>; sync: () => 0 },
			SyncerSwitch
		>()
	})
})
