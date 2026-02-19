// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, it } from '@jest/globals'
import { $Assert } from '@voltiso/util'

import type { Handler } from './Handler'

describe('Handler', () => {
	it('generic', <O extends Partial<Handler.Options>>() => {
		$Assert.is<Handler<O>, Handler>()
	})
})
