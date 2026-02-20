// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import { $Assert } from '_'

import type { Callable, EmptyArrowCallable } from '~/function'

describe('EmptyArrowCallable', () => {
	it('type', <O extends Callable<{ this: void }>>() => {
		expect.assertions(0)

		$Assert.is<EmptyArrowCallable<O>, EmptyArrowCallable>()
	})
})
