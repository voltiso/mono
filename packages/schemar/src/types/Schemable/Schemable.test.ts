// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import { $Assert } from '@voltiso/util'

import type { Inferable, Schemable } from '~'

describe('Schemable', () => {
	it('type', () => {
		expect.assertions(0)

		$Assert.is<Schemable[], Inferable>()
		$Assert.is<readonly Schemable[], Inferable>()
	})
})
