// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// const isCjs = typeof require === 'function'
// console.log('isCjs', isCjs)

import type { StaticError } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import type { Props } from '~/react-types'
import type { IStylable } from '~/Stylable'

import type { IStyled } from './IStyled'
import type { Styled } from './StyledImpl'

describe('Styled', () => {
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
	it('generic', <P extends Props, C extends IStylable | null>() => {
		expect.assertions(0)

		$Assert.is<Styled<{ Props: P; Component: C }>, IStyled | StaticError>()
	})
})
