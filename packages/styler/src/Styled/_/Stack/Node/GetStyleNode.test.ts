// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '@voltiso/util'

import type { Props } from '~/react-types'

import type { GetStyleNode, IGetStyleNode } from './GetStyleNode'

describe('GetStyleNode', () => {
	it('generic', <P extends Props>() => {
		expect.assertions(0)

		$Assert.is<GetStyleNode<P>, IGetStyleNode>()
	})
})
