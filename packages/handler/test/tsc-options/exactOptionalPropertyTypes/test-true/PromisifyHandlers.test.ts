// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, it } from '@jest/globals'
import * as s from '@voltiso/schemar'
import { $Assert } from '@voltiso/util'

import { checked } from '~'

describe('checked - with exactOptionalPropertyTypes', () => {
	it('works', () => {
		const a = checked
			.parameter({ a: s.number })
			.implement(params => params.a * 2)

		$Assert.is<typeof a, (args_0: { a: number }) => void>()
	})
})
