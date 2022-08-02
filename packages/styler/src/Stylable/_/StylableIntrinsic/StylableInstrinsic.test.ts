// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { Assert } from '@voltiso/util'

import type { Props } from '~/react-types'

import type { StylableIntrinsic } from './AutoStylableIntrinsic'
import type { IStylableIntrinsic } from './StylableIntrinsic'

describe('StylableIntrinsic', () => {
	it('generic', <P extends Props>() => {
		expect.assertions(0)

		Assert.is<StylableIntrinsic<P>, IStylableIntrinsic>()
	})
})
