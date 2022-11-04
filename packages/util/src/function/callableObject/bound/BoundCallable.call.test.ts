// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { staticImplements } from '~/class'
import { clone } from '~/clone'

import { CALL } from '../CALL'
import { BoundCallable } from './BoundCallable'

const sym = Symbol('sym')

@staticImplements<ClassConstructor>()
class Class_ {
	constructor(arg: string | number) {
		this._data = `${arg}?`
		Object.defineProperty(this, 'nonEnum', {
			enumerable: false,
		})
		return BoundCallable(this)
	}

	[CALL](s: string): string
	[CALL](n: number): string

	[CALL](arg: string | number) {
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

type Class = BoundCallable<Class_>
const Class = Class_ as ClassConstructor<Class>

describe('BoundCallable', () => {
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

	it('sets correct `this` context', () => {
		expect.hasAssertions()

		class Test {
			fun() {
				return this
			}

			[CALL]() {
				return this
			}

			constructor() {
				return BoundCallable(this)
			}
		}

		const test = new Test() as BoundCallable<Test>

		expect(test()).toBe(test)
		expect(test.fun()).toBe(test)
	})

	it('works with spread', () => {
		expect.hasAssertions()

		class C {
			constructor() {
				return BoundCallable(this)
			}

			[CALL]() {
				return this
			}
		}

		const c = new C()

		expect({ ...c }).toStrictEqual({})
		expect(Reflect.ownKeys(c)).toStrictEqual(['clone'])
	})

	it('clone', () => {
		expect.hasAssertions()

		interface C {
			(): unknown
		}

		class C {
			constructor() {
				return BoundCallable(this)
			}

			[CALL]() {
				return this
			}
		}

		const original = new C()
		const cloned = clone(original)

		expect(original()).toBe(original)
		expect(cloned()).toBe(cloned)
	})
})
