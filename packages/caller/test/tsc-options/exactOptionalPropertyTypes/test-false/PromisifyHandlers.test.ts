// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import { checked } from '~'

describe('PromisifyHandlers', () => {
	it('works', () => {
		const a = checked.param({ a: s.number }).function(params => params.a * 2)
		$Assert<IsIdentical<typeof a, (args_0: { a: number }) => void>>()
	})
})
