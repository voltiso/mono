// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import { $Assert } from '@voltiso/util'

import type { $$DocTI } from '~/Doc'

import type { DocDerivedData, defaultDocDerivedData } from './DocDerivedData'

describe('DocDerivedData', () => {
	it('works (static)', () => {
		expect.assertions(0)

		$Assert.is<DocDerivedData, $$DocTI>()
		$Assert.is<typeof defaultDocDerivedData, DocDerivedData>()
	})
})
