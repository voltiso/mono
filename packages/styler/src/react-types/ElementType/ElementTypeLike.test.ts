// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import { $Assert } from '@voltiso/util'
import type { ReactNode } from 'react'

import type { ReactNodeLike } from './ElementTypeLike'

describe('ElementTypeLike', () => {
	it('type', () => {
		expect.assertions(0)

		$Assert.is<ReactNode, ReactNodeLike>()
	})
})
