// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { Assert } from '~/type/static-assert'

import type { Eval } from './eval'

describe('eval', () => {
	it('works', () => {
		expect.assertions(0)

		Assert.is<Eval<'2', ['123', 22]>, 22>()
		Assert.is<Eval<'1', ['123', 22]>, '123'>()
		Assert.is<Eval<'!1', ['123', 22]>, false>()
		Assert.is<Eval<'!1 | 2', ['123', 0]>, false>()
		Assert.is<Eval<'!1 | 2', ['123', 1]>, true>()
		Assert.is<Eval<'isNumber', ['123']>, false>()
		Assert.is<Eval<'isNumber', [123]>, true>()
	})
})
