// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { Assert } from '@voltiso/util'

import type { Props } from '~/react-types'
import type { IStylable } from '~/Stylable'

import type { IStyledDataWithTypeInfo } from './IStyledDataWithTypeInfo'
import type { StyledDataWithTypeInfo } from './StyledDataWithTypeInfo'

describe('StyledDataWithTypeInfo', () => {
	it('generic', <P extends Props, C extends IStylable | null>() => {
		expect.assertions(0)

		// Assert.is<StylerDataWithTypeInfo<P, C>, StylerDataWithTypeInfo_<P, C>>() // :(

		Assert.is<StyledDataWithTypeInfo<P, C>, IStyledDataWithTypeInfo>()
		// Assert.is<StylerDataWithTypeInfo<P, C>, StylerDataWithTypeInfo>()
	})
})
