// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { Assert } from '@voltiso/util'

import type { Props } from '../react-types'
import type { IStylable } from '../Stylable'
import type { Styled } from './AutoStyled.js'
import type { IStyled } from './IStyled.js'

describe('Styled', () => {
	it('generic', <P extends Props, C extends IStylable | null>() => {
		expect.assertions(0)

		Assert.is<Styled<P, C>, IStyled>()
		Assert.is<Styled<P, C>, Styled>()
	})
})
