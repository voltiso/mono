/* eslint-disable no-magic-numbers */
/* eslint-disable no-constructor-return */
import { CallableInstance, callableInstance } from './callableInstance'
import { staticImplements } from './staticImplements'

function classCall(s: string): string
function classCall(n: number): string

function classCall(this: Class_, arg: string | number) {
	return `${arg}!`
}

@staticImplements<ClassConstructor>()
class Class_ {
	constructor(arg: string | number) {
		this._data = `${arg}?`
		return callableInstance(this, classCall)
	}

	_data: string | number
}

interface ClassConstructor<Derived extends Class_ = Class_> {
	new (arg: string): Derived
	new (arg: number): Derived
}

type Class = CallableInstance<Class_, typeof classCall>
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
