/* eslint-disable max-statements */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-magic-numbers */
/* eslint-disable no-constructor-return */
import { CallableInstance, callableInstance } from './callableInstance'
import { staticImplements } from './staticImplements'

const sym = Symbol('sym')

@staticImplements<ClassConstructor>()
class Class_ {
	constructor(arg: string | number) {
		this._data = `${arg}?`
		Object.defineProperty(this, 'nonEnum', {
			enumerable: false,
		})
		return callableInstance(this)
	}

	_CALL(s: string): string
	_CALL(n: number): string

	_CALL(arg: string | number) {
		return `${arg}!`
	}

	length() {
		return 99
	}

	nonEnum = 11

	opt?: number;

	[sym] = 99

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

		expect(c.opt).toBeUndefined()

		c.opt = 444
		expect(c.opt).toBe(444)
		expect({ ...c }).toStrictEqual({ [sym]: 99, _data: 'test?', opt: 444 })

		expect(c.constructor).toBe(Class)
		expect(Object.getPrototypeOf(c)).toBe(Class.prototype)

		expect(c.nonEnum).toBe(11)

		c.nonEnum = 22
		expect(c.nonEnum).toBe(22)

		c._data = 'aaa'
		expect(c._data).toBe('aaa')

		expect(c.length()).toBe(99)
	})
})
