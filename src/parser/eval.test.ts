import { Assert } from '../assert'
import { Eval } from './eval'

describe('eval', () => {
	it('works', () => {
		expect.assertions(0)
		Assert<Eval<'2', ['123', 22]>, 22>()
		Assert<Eval<'1', ['123', 22]>, '123'>()
		Assert<Eval<'!1', ['123', 22]>, false>()
		Assert<Eval<'!1 | 2', ['123', 0]>, false>()
		Assert<Eval<'!1 | 2', ['123', 1]>, true>()
		Assert<Eval<'isNumber', ['123']>, false>()
		Assert<Eval<'isNumber', [123]>, true>()
	})
})
