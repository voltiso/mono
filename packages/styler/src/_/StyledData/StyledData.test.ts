// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '@voltiso/util'

import type { Props } from '~/react-types'
import type { IStylable } from '~/Stylable'

import type { IStyledData } from './IStyledData'
import type { StyledData } from './StyledData'

describe('StyledData', () => {
	it('generic', <P extends Props, C extends IStylable | null, CC extends {}>() => {
		expect.assertions(0)

		$Assert.is<
			StyledData<{ Props: P; Component: C; CustomCss: CC }>,
			IStyledData<object>
		>()
	})
})
