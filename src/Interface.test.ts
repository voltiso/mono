/* eslint-disable @typescript-eslint/no-empty-function */
// import { expect } from 'chai'
import { createClassInterface, Interface } from './Interface'
import { Unpack } from './array/Unpack'

describe('interface', function () {
	it('works', function () {
		expect.hasAssertions()
		class ClassImpl<A = unknown> {
			_a: A & string
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			constructor(_a: A & string) {
				this._a = _a
			}
			aaa = 2
			baa = 'bbb'
			caa() {
				return 1 + this.aaa + this.test + this.daa() // 11
			}
			daa() {
				return 3
			}
			static eee = 999
			fff = function () {
				return 'fds'
			}
			_CALL(x: number) {
				return x + this.caa() // x + 11
			}

			_PROXY_OBJECT: { testproxy: number; otherProxyVal?: string; toDelete?: number } = {
				testproxy: 123,
				toDelete: 666,
			}

			ftest() {
				return 444
			}
			get test() {
				return this.aaa + this.daa() // 5
			}
			x = 1
			set setterx(x: number) {
				this.x = x
			}
			get gx() {
				return this.x
			}

			clone() {
				return new ClassImpl<A>(this._a)
			}
		}

		expect(() => createClassInterface(ClassImpl, ['aaa', 'caa'])).toThrow('aaa')

		expect(() => createClassInterface(ClassImpl, 'fff')).toThrow('fff')

		const publicFields = ['caa', 'test', 'setterx', 'gx', 'clone'] as const
		const Class = createClassInterface(ClassImpl, publicFields)
		type Class = Interface<ClassImpl, Unpack<typeof publicFields>>
		const c = new Class('')

		expect(c.gx).toBe(1)
		c.setterx = 1239
		expect(c.gx).toBe(1239)

		expect(c(12)).toBe(23)
		expect(c.caa()).toBe(11)
		expect(c.test).toBe(5)

		expect(c.testproxy).toBe(123)
		c.otherProxyVal = 'asd'
		expect(c.otherProxyVal).toBe('asd')
		expect(c._._PROXY_OBJECT.otherProxyVal).toBe('asd')

		delete c.toDelete
		expect(c.toDelete).toBeUndefined()
		expect(c._._PROXY_OBJECT.toDelete).toBeUndefined()

		expect((c as unknown as ClassImpl).aaa).toBeUndefined()
		expect(c.caa()).toBe(11)
		// eslint-disable-next-line @typescript-eslint/unbound-method
		expect((c as unknown as ClassImpl).daa).toBeUndefined()
		// eslint-disable-next-line @typescript-eslint/unbound-method
		expect((c as unknown as ClassImpl).fff).toBeUndefined()

		// expect(c.clone()).toBeInstanceOf(Class)
	})
})
