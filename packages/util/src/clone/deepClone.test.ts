// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'

import { deepClone } from './deepClone'

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

describe('deepClone', () => {
	it('works', () => {
		expect.hasAssertions()

		const x = {
			d: new Date('2022-02-20'),
			arr: [1, 2, 3],
			cl: new MyCloneable(11),
		}
		const y = deepClone(x)
		const z = deepClone(x)
		z.d = new Date('2022-02-22')
		z.arr[0] = 999
		z.arr.length = 2
		z.cl.x = 44

		expect(y.arr[0]).toBe(1)
		expect(y.d).toStrictEqual(new Date('2022-02-20'))
		expect(y.cl.x).toBe(11)
		expect(y.cl._cloned).toBeTruthy()
		expect(x.cl._cloned).toBeFalsy()
	})

	it('array', () => {
		const array = [1, 2, 3]
		const clonedArray = deepClone(array)

		expect(Object.getOwnPropertyNames(clonedArray)).toStrictEqual(
			Object.getOwnPropertyNames(array),
		)

		expect(Object.getOwnPropertySymbols(clonedArray)).toStrictEqual(
			Object.getOwnPropertySymbols(array),
		)

		expect(Object.getOwnPropertyDescriptors(clonedArray)).toStrictEqual(
			Object.getOwnPropertyDescriptors(array),
		)

		expect(Object.getPrototypeOf(clonedArray)).toBe(
			Object.getPrototypeOf(array),
		)

		expect(clonedArray.constructor).toBe(array.constructor)

		expect(Array.isArray(clonedArray)).toBeTruthy()
	})

	it('ref', () => {
		const nested = {}

		const a = {
			nested,
			sameNested: nested,
		}

		const b = deepClone(a)

		expect(b).toStrictEqual(a)
		expect(b.nested).not.toBe(a.nested)
		expect(b.sameNested).toBe(b.nested)
	})

	it('recursive', () => {
		const obj: any = { a: { b: { c: {} } } }
		obj.a.b.c.d = obj
		const clonedObj = deepClone(obj)

		expect(clonedObj).toStrictEqual(obj)
	})

	it('date with properties', () => {
		expect.hasAssertions()

		const d = new Date('2022-05-08') as any
		d.secret = 123

		expect(d.secret).toBe(123)

		const c = deepClone(d)

		expect(c.secret).toBe(123)
	})

	it('getters and setters', () => {
		expect.hasAssertions()

		class C {
			_x = 123

			get x() {
				return this._x
			}

			set x(v: number) {
				this._x = v
			}
		}

		const c = new C()

		const cc = deepClone(c)

		c.x = 2
		cc.x = 3

		expect(c.x).toBe(2)
		expect(c._x).toBe(2)

		expect(cc.x).toBe(3)
		expect(cc._x).toBe(3)
	})

	it('set', () => {
		expect.hasAssertions()

		const s = new Set([1, 2, 3]) as any
		s.secret = 123

		expect(s).toStrictEqual(new Set([1, 2, 3]))
		expect(s.secret).toBe(123)

		const c = deepClone(s)
		s.secret = 1
		s.add(4)

		expect(c).toStrictEqual(new Set([1, 2, 3]))
		expect(c.secret).toBe(123)
	})
})
