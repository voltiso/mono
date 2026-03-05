// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '@voltiso/util'
import { describe, expect, it } from 'vitest'

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
