// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '@voltiso/util'

import type { Props } from '~/react-types'

import type { INode, Node } from './Node'

describe('Node', () => {
	it('generic', <P extends Props>() => {
		expect.assertions(0)

		$Assert.is<Node<P>, INode>()
	})
})
