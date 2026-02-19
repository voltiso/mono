// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import { $Assert } from '@voltiso/util'
import type * as React from 'react'
import type { View } from 'react-native'

import type { ForwardRefRenderFunction } from './ForwardRefRenderFunction'

describe('ForwardRefRenderFunction', () => {
	// eslint-disable-next-line jest/prefer-ending-with-an-expect
	it('type', () => {
		expect.assertions(0)

		$Assert.is<
			React.ForwardRefRenderFunction<View, { a: 1 }>,
			ForwardRefRenderFunction<View, { a: 1 }>
		>()

		$Assert.is<
			React.ForwardRefRenderFunction<View, { a: 1 }>,
			ForwardRefRenderFunction<typeof View, { a: 1 }>
		>()
	})
})
