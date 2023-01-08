// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '@voltiso/util'

import type { Props } from '~/react-types'

import type {
	NativeOuterProps,
	OuterPropsBase,
	WebOuterProps,
} from './OuterProps'

describe('OuterProps', <CustomCss extends object>() => {
	it('type', () => {
		expect.assertions(0)

		$Assert.is<OuterPropsBase<CustomCss>, Props>()

		$Assert.is<WebOuterProps<CustomCss>, Props>()
		$Assert.is<NativeOuterProps<CustomCss>, Props>()
	})
})
