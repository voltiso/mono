/* eslint-disable class-methods-use-this */
/* eslint-disable max-statements */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-magic-numbers */
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

describe('clone', () => {
	// eslint-disable-next-line max-statements
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

		expect(y.arr[0]).toBe(1)
		expect(y.d).toStrictEqual(new Date('2022-02-20'))
		expect(y.cl.x).toBe(11)
		expect(y.cl._cloned).toBeTruthy()
		expect(x.cl._cloned).toBeFalsy()
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
		expect(Object.getOwnPropertyNames(cc)).toStrictEqual(Object.getOwnPropertyNames(c))
		expect(Object.getOwnPropertySymbols(cc)).toStrictEqual(Object.getOwnPropertySymbols(c))
		expect(c._a).toBe(234)
		expect(cc._a).toBe(123)
		expect(c[sym]).toBe(888)
		expect(cc[sym]).toBe(999)
		expect(c.f()).toBe(444)
		expect(cc.f()).toBe(444)
	})
})
