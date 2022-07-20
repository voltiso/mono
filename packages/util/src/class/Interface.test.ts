// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Unpack } from '../array/Unpack.js'
import type { Interface } from './Interface.js'
import { createClassInterface } from './Interface.js'

describe('interface', () => {
	it('works', () => {
		expect.hasAssertions()

		class ClassImpl<A = unknown> {
			_a: A & string

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

			_PROXY_OBJECT: {
				otherProxyVal?: string
				testProxy: number
				toDelete?: number
			} = {
				testProxy: 123,
				toDelete: 666,
			}

			fTest() {
				return 444
			}

			get test() {
				return this.aaa + this.daa() // 5
			}

			x = 1
			// eslint-disable-next-line accessor-pairs
			set setterX(x: number) {
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

		const publicFields = ['caa', 'test', 'setterX', 'gx', 'clone'] as const
		const Class = createClassInterface(ClassImpl, publicFields)
		type Class = Interface<ClassImpl, Unpack<typeof publicFields>>
		const c = new Class('')

		expect(c.gx).toBe(1)

		c.setterX = 1239

		expect(c.gx).toBe(1239)

		expect(c(12)).toBe(23)
		expect(c.caa()).toBe(11)
		expect(c.test).toBe(5)

		expect(c.testProxy).toBe(123)

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
