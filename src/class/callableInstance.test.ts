/* eslint-disable class-methods-use-this */
/* eslint-disable no-magic-numbers */
/* eslint-disable no-constructor-return */
import { CallableInstance, callableInstance } from './callableInstance'
import { staticImplements } from './staticImplements'

@staticImplements<ClassConstructor>()
class Class_ {
	constructor(arg: string | number) {
		this._data = `${arg}?`
		return callableInstance(this)
	}

	_CALL(s: string): string
	_CALL(n: number): string

	_CALL(arg: string | number) {
		return `${arg}!`
	}

	_data: string | number
}

interface ClassConstructor<Derived extends Class_ = Class_> {
	new (arg: string): Derived
	new (arg: number): Derived
}

type Class = CallableInstance<Class_>
const Class = Class_ as ClassConstructor<Class>

describe('callableInstance', () => {
	it('works', () => {
		expect.hasAssertions()

		const c = new Class('test')
		expect(c._data).toBe('test?')

		const x = c(123)
		expect(x).toBe('123!')
	})
})
