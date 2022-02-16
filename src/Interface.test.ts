/* eslint-disable @typescript-eslint/no-empty-function */
import { expect } from 'chai'
import { createClassInterface } from './Interface'

describe('Interface', function () {
	it('works', function () {
		class ClassImpl {
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

			_PROXY_OBJECT: { testproxy: number; otherProxyVal?: string } = { testproxy: 123 }

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
		}

		expect(() => createClassInterface(ClassImpl, ['aaa', 'caa'])).to.throw('aaa')

		expect(() => createClassInterface(ClassImpl, 'fff')).to.throw('fff')

		const Class = createClassInterface(ClassImpl, ['caa', 'test', 'setterx', 'gx'])
		type Class = InstanceType<typeof Class>
		const c = new Class()

		expect(c.gx).to.equal(1)
		c.setterx = 1239
		expect(c.gx).to.equal(1239)

		expect(c(12)).to.equal(23)
		expect(c.caa()).to.equal(11)
		expect(c.test).to.equal(5)

		expect(c.testproxy).to.equal(123)
		c.otherProxyVal = 'asd'
		expect(c.otherProxyVal).to.equal('asd')
		expect(c._._PROXY_OBJECT.otherProxyVal).to.equal('asd')

		expect((c as unknown as ClassImpl).aaa).to.be.undefined
		expect(c.caa()).to.equal(11)
		// eslint-disable-next-line @typescript-eslint/unbound-method
		expect((c as unknown as ClassImpl).daa).to.be.undefined
		// eslint-disable-next-line @typescript-eslint/unbound-method
		expect((c as unknown as ClassImpl).fff).to.be.undefined
	})
})
