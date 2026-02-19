// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, it } from '@jest/globals'
import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import type { Inferable } from './Inferable'

describe('Inferable', () => {
	it('type', () => {
		$Assert<IsIdentical<Inferable<123>, 123>>()
		$Assert<IsIdentical<Inferable<123n | 'test'>, 123n | 'test'>>()
		$Assert<IsIdentical<Inferable<{}>, {}>>()

		$Assert<IsIdentical<Inferable<number | string>, never>>()

		$Assert<IsIdentical<Inferable<object>, object>>() // ! ?
	})
})
