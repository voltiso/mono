// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'

import { BoundCallable, CALL } from '~/function'
import { lazyFunction } from '~/lazy'

import { clone } from './clone'

class MyCloneable {
	_priv = 999
	x: number

	_cloned = false

	constructor(x: number) {
		this.x = x
	}

	clone() {
		const r = new MyCloneable(this.x)
		r._cloned = true
		return r
	}
}

// eslint-disable-next-line sonarjs/max-lines-per-function
describe('clone', () => {
	// eslint-disable-next-line jest/no-commented-out-tests
	// it('strict mode', () => {
	// 	expect.hasAssertions()

	// 	expect(isStrict).toBeTruthy()
	// })

	it('simple', () => {
		expect.hasAssertions()
		expect(clone(null)).toBeNull()

		expect(clone(undefined)).toBeUndefined()
		expect(clone(123)).toBe(123)
		expect(clone('123')).toBe('123')
		expect(clone(BigInt(123))).toBe(BigInt(123))

		const sym = Symbol('sym')

		expect(clone(sym)).toBe(sym)

		const f = () => 123

		expect(clone(f)()).toBe(123)
	})

	it('array with properties', () => {
		expect.hasAssertions()

		const array = [1, 2, 3] as any
		array[10] = 10
		array.test = 'asd'

		const c = clone(array)

		expect(Object.getPrototypeOf(c)).toBe(Object.getPrototypeOf(array))
		expect(c.test).toBe('asd')
		expect(array.test).toBe('asd')
		expect(c).toStrictEqual(array)
		expect(c[0]).toBe(array[0])
		expect(Array.isArray(c)).toBeTruthy()
	})

	it('array with properties and proto', () => {
		expect.hasAssertions()

		const array = [1, 2, 3] as any
		array[10] = 10
		array.test = 'asd'

		Object.setPrototypeOf(array, { x: 11 })

		expect(array.x).toBe(11)

		const c = clone(array)

		expect(c.x).toBe(11)

		expect(Object.getPrototypeOf(c)).toBe(Object.getPrototypeOf(array))
		expect(c.test).toBe('asd')
		expect(array.test).toBe('asd')
		expect(c).toStrictEqual(array)
		expect(c[0]).toBe(array[0])

		Object.getPrototypeOf(array).x = 33

		expect(c.x).toBe(array.x)
	})

	it('function', () => {
		expect.hasAssertions()

		const f0 = () => 123
		const ff0 = clone(f0)

		expect(ff0).toHaveLength(f0.length)

		const f0x = (..._args: unknown[]) => 123
		const ff0x = clone(f0x)

		expect(ff0x).toHaveLength(f0x.length)

		const f1 = (_a: unknown) => 123
		const ff1 = clone(f1)

		expect(ff1).toHaveLength(f1.length)

		const f1x = (_a: unknown, ..._args: unknown[]) => 123
		const ff1x = clone(f1x)

		expect(ff1x).toHaveLength(f1x.length)
	})

	it('function with properties', () => {
		expect.hasAssertions()

		const f = () => 123
		f.magic = 1_234

		const ff = clone(f)

		expect(ff()).toBe(123)
	})

	it('function with properties and proto', () => {
		expect.hasAssertions()

		const base = {
			x: 3,
		}

		function f(this: number | void | undefined, arg: number) {
			// @ts-expect-error `this.x` does not exist
			const multiply = (typeof this === 'number' ? this : this?.x) || 1
			return arg * multiply + 1
		}
		f.magic = 1_234
		Object.setPrototypeOf(f, base)

		const ff = clone(f, { omit: ['doesNotExist'] as const })

		// @ts-expect-error does not exist
		expect(f.x).toBe(3)

		// @ts-expect-error does not exist
		expect(ff.x).toBe(3)

		expect(f.magic).toBe(1_234)
		expect(ff.magic).toBe(1_234)

		expect(f(11)).toBe(12)
		expect(ff(11)).toBe(12)

		expect(Function.prototype.call.call(f, { x: 2 }, 11)).toBe(23)
		expect(Function.prototype.call.call(ff, { x: 2 }, 11)).toBe(23)
	})

	it('works', () => {
		expect.hasAssertions()

		const x = {
			d: new Date('2022-02-20'),
			arr: [1, 2, 3],
			cl: new MyCloneable(11),
		}
		const y = clone(x)
		const z = clone(x)
		z.d = new Date('2022-02-22')
		z.arr[0] = 999
		z.arr.length = 2
		z.cl.x = 44

		expect(y.arr[0]).toBe(999)
		expect(y.d).toStrictEqual(new Date('2022-02-20'))
		expect(y.cl.x).toBe(44)
		expect(y.cl._cloned).toBeFalsy()
		expect(x.cl._cloned).toBeFalsy()
	})

	it('cloneable root', () => {
		expect.hasAssertions()

		const cloneable = new MyCloneable(1232)
		const myClone = clone(cloneable)

		expect(myClone.x).toBe(1232)
		expect(myClone._cloned).toBeTruthy()
	})

	it('clones proto', () => {
		expect.hasAssertions()

		const sym = Symbol('sym')

		class C {
			_a: number;
			[sym] = 999

			static s = 111

			constructor(a: number) {
				this._a = a
				Object.defineProperty(this, '_a', {
					enumerable: false,
				})
			}

			f() {
				return 444
			}
		}

		const c = new C(123)
		const cc = clone(c)

		c._a = 234
		C.s = 222
		c[sym] = 888

		expect(Object.getPrototypeOf(cc)).toBe(Object.getPrototypeOf(c))
		expect(Object.getOwnPropertyNames(cc)).toStrictEqual(
			Object.getOwnPropertyNames(c),
		)
		expect(Object.getOwnPropertySymbols(cc)).toStrictEqual(
			Object.getOwnPropertySymbols(c),
		)
		expect(c._a).toBe(234)
		expect(cc._a).toBe(123)
		expect(c[sym]).toBe(888)
		expect(cc[sym]).toBe(999)
		expect(c.f()).toBe(444)
		expect(cc.f()).toBe(444)
	})

	it('does not mess original', () => {
		expect.hasAssertions()

		class C_ {
			constructor() {
				return BoundCallable(this)
			}

			[CALL]() {
				return 123
			}

			a = 1
		}

		type C = C_ & C_[CALL]
		const C = C_ as new () => C

		const c = new C()

		expect(c()).toBe(123)

		const cc = clone(c, { omit: ['doesNotExist'] as const })

		expect(cc()).toBe(123)

		cc.a = 222

		expect(c.a).toBe(1)
	})

	it('set', () => {
		expect.hasAssertions()

		const s = new Set([1, 2, 3]) as any
		s.secret = 123

		expect(s).toStrictEqual(new Set([1, 2, 3]))
		expect(s.secret).toBe(123)

		const c = clone(s)

		expect(c).toStrictEqual(new Set([1, 2, 3]))
		expect(c.secret).toBe(123)
	})

	it('clones lazy callable instances', () => {
		expect.hasAssertions()

		// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
		interface C {
			(...args: any): any
		}

		// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
		class C {
			constructor() {
				return BoundCallable(this)
			}

			[CALL]() {
				return 123
			}

			field = 3

			static staticField = 33
		}

		const c = lazyFunction(() => new C())
		const d = clone(c, { omit: ['doesNotExist'] as const })

		c.field = 4
		C.staticField = 44

		expect(c.field).toBe(4)
		expect((c.constructor as any).staticField).toBe(44)

		expect(d.field).toBe(3)
		expect((d.constructor as any).staticField).toBe(44)
	})

	it('omit', () => {
		const obj = {
			a: 1,
			b: 2,
		}

		const clonedObj = clone(obj, { omit: ['a'] })

		expect(clonedObj).toStrictEqual({ b: 2 })
	})
})
