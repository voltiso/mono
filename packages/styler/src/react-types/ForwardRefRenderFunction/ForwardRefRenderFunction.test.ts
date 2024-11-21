// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '@voltiso/util'
import type * as React from 'react'
import type { View } from 'react-native'

import type { ForwardRefRenderFunction } from './ForwardRefRenderFunction'

describe('ForwardRefRenderFunction', () => {
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
