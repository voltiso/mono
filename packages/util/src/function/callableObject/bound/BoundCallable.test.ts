// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '_'

import type { BoundCallable } from './BoundCallable'
import type { BoundCallableOptions } from './BoundCallableOptions'

describe('BoundCallable', () => {
	it('generic', <Options extends BoundCallableOptions>() => {
		expect.assertions(0)

		$Assert.is<BoundCallable<Options>, BoundCallable>()
	})
})
