// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '@voltiso/util'
import type { ReactNode } from 'react'

import type { ReactNodeLike } from './ElementTypeLike'

describe('ElementTypeLike', () => {
	it('type', () => {
		expect.assertions(0)

		$Assert.is<ReactNode, ReactNodeLike>()
	})
})
