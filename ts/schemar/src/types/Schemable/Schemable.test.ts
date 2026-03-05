// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '@voltiso/util'
import { describe, expect, it } from 'vitest'

import type { Inferable, Schemable } from '~'

describe('Schemable', () => {
	it('type', () => {
		expect.assertions(0)

		$Assert.is<Schemable[], Inferable>()
		$Assert.is<readonly Schemable[], Inferable>()
	})
})
