// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import { $Assert } from '@voltiso/util'

import type { Props } from '~/react-types'

import type { IMapProps, MapProps } from './MapProps'
import type { IMapPropsNode, MapPropsNode } from './MapPropsNode'

describe('MapPropsNode', () => {
	it('generic', <OP extends Props, IP extends Props>() => {
		expect.assertions(0)

		$Assert.is<MapProps<OP, IP>, IMapProps>()
		$Assert.is<MapPropsNode<OP, IP>, IMapPropsNode>()
	})
})
