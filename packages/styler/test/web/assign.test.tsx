// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { Assert } from '@voltiso/util'

import { style } from '../../src'

describe('assign', () => {
	it('extended', () => {
		expect.assertions(0)

		const Input = style('input')
		const ExtendedInput = style('input').newProps({ magicX: 0 })
		Assert.is<typeof ExtendedInput, typeof Input>()
		Assert.is<typeof Input, typeof ExtendedInput>()
	})
})
