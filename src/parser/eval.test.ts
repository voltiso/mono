import { Assert } from '../bdd'
import { Eval } from './eval'

describe('eval', () => {
	it('works', () => {
		expect.assertions(0)
		Assert.isSubtype<Eval<'2', ['123', 22]>, 22>()
		Assert.isSubtype<Eval<'1', ['123', 22]>, '123'>()
		Assert.isSubtype<Eval<'!1', ['123', 22]>, false>()
		Assert.isSubtype<Eval<'!1 | 2', ['123', 0]>, false>()
		Assert.isSubtype<Eval<'!1 | 2', ['123', 1]>, true>()
		Assert.isSubtype<Eval<'isNumber', ['123']>, false>()
		Assert.isSubtype<Eval<'isNumber', [123]>, true>()
	})
})
