// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { Assert } from '@voltiso/util'

import type { Props } from '../react-types'
import type {
	NativeOuterProps,
	OuterPropsBase,
	WebOuterProps,
} from './OuterProps.js'

describe('OuterProps', () => {
	it('type', () => {
		expect.assertions(0)

		Assert.is<OuterPropsBase, Props>()

		Assert.is<WebOuterProps, Props>()
		Assert.is<NativeOuterProps, Props>()
	})
})
