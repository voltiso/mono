/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-statements */

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
