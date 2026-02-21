// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '@voltiso/util'
import type { ForwardRefRenderFunction } from 'react'
import { describe, expect, it } from 'vitest'

import type { Props } from '~/react-types'
import type { IStylable } from '~/Stylable'

import type { IForwardRefRenderFunction } from './IForwardRefRenderFunction'

describe('IForwardRefRenderFunction', () => {
	it('generic', <P extends Props, C extends IStylable | null>() => {
		expect.assertions(0)

		type A = ForwardRefRenderFunction<C, P>
		$Assert.is<A, IForwardRefRenderFunction>()
	})
})
