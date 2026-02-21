// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '@voltiso/util'
import { describe, it } from 'vitest'

import type { Handler } from './Handler'

describe('Handler', () => {
	it('generic', <O extends Partial<Handler.Options>>() => {
		$Assert.is<Handler<O>, Handler>()
	})
})
