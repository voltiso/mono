// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '@voltiso/util'

import type { Props } from '~/react-types'

import type { ChildElement } from './ChildElement'
import type { IChildElement } from './IChildElement'

describe('ChildElement', () => {
	it('generic', <P extends Props>() => {
		expect.assertions(0)

		$Assert.is<ChildElement<P>, IChildElement>()
	})
})
