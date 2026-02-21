// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '_'
import { describe, expect, it } from 'vitest'

import type { WithSelfBoundCALL } from './CALL'
import { CALL } from './CALL'

describe('CALL', () => {
	it('type', () => {
		expect.assertions(0)

		interface MySelfBound {
			[CALL](this: this, a: number): number
			field: number
		}

		$Assert.is<MySelfBound, WithSelfBoundCALL>()
	})
})
