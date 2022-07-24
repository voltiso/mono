// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { Assert, Is } from '@voltiso/util'

import type * as s from '..'

describe('TypeOnlySchema', () => {
	it('type', () => {
		expect.assertions(0)

		Assert.is<s.Boolean, s.Schema>()
		Assert.is<s.Boolean, s.Schema<unknown>>()
		Assert.is<s.Boolean, s.Schema<boolean>>()
		Assert(Is<s.Boolean>().not.subtypeOf<s.Schema<true>>())

		Assert.is<s.Boolean['optional'], s.Schema<boolean>['optional']>() // !TODO
	})
})
