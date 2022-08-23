// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { Assert } from '@voltiso/util'
import type { ComponentPropsWithRef } from 'react'

import type { TextProps } from './TextProps'

describe('TextProps', () => {
	it('static', () => {
		expect.assertions(0)

		Assert.is<ComponentPropsWithRef<'input'>, TextProps>()
	})
})
