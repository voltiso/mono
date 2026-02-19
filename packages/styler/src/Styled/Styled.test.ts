// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// const isCjs = typeof require === 'function'
// console.log('isCjs', isCjs)

import { describe, expect, it } from '@jest/globals'
import type { StaticError } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import type { Props } from '~/react-types'
import type { IStylable } from '~/Stylable'

import type { IStyled } from './IStyled'
import type { Styled } from './StyledImpl'

describe('Styled', () => {
	// eslint-disable-next-line jest/prefer-ending-with-an-expect
	it('generic', <P extends Props, C extends IStylable | null>() => {
		expect.assertions(0)

		$Assert.is<Styled<{ Props: P; Component: C }>, IStyled | StaticError>()
	})
})
