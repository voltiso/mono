// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import { $Assert } from '@voltiso/util'

import type { StyledTypeInfo } from '~/StyledTypeInfo'

import type { GetStyledTypeInfo } from './GetStyledTypeInfo'
import type { Styled } from './StyledImpl'
import type { StyledLike } from './StyledLike'

describe('GetStyledTypeInfo', () => {
	it('type', <$ extends Partial<StyledTypeInfo>>() => {
		expect.assertions(0)

		// type A = Styled<$>[STYLED_TYPE_INFO]['Component']
		// type B = StyledLike[STYLED_TYPE_INFO]['Component']

		$Assert.is<Styled<$>, StyledLike>()

		$Assert.is<GetStyledTypeInfo<$>, StyledTypeInfo>()
	})
})
