// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import { $Assert } from '@voltiso/util'

import type { DefaultStyledData } from './defaultStyledData'
import type { IStyledData } from './IStyledData'

describe('defaultStyledData', () => {
	it('type', () => {
		expect.assertions(0)

		$Assert.is<DefaultStyledData, IStyledData<object>>()
	})
})
