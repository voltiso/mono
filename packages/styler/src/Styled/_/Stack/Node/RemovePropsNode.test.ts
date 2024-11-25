// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import { $Assert } from '@voltiso/util'

import type { Props } from '~/react-types'

import type { IRemovePropsNode, RemovePropsNode } from './RemovePropsNode'

describe('RemovePropsNode', () => {
	it('generic', <P extends Props>() => {
		expect.assertions(0)

		$Assert.is<RemovePropsNode<P>, IRemovePropsNode>()
	})
})
