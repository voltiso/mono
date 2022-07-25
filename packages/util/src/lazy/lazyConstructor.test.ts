// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from './lazyConstructor.js'
import { lazyValue } from './lazyValue.js'

class BaseX {
	static staticField = 3

	baseField = 0

	constructor(x: number) {
		this.baseField = x
	}
}

class Derived extends BaseX {
	derivedField = 8

	derivedField2 = 1

	constructor(x: number) {
		super(x)

		this.derivedField2 = this.getValue()
	}

	getValue() {
		return 99
	}
}

class LazyDerived extends lazyConstructor(() => BaseX) {
	derivedField = 8

	derivedField2 = 1

	constructor(x: number) {
		super(x)

		this.derivedField2 = this.getValue()
	}

	getValue() {
		return 99
	}
}

describe('lazyConstructor', () => {
	it('works', () => {
		expect.hasAssertions()

		expect(BaseX.staticField).toBe(3)
		expect(Derived.staticField).toBe(3)
		expect(LazyDerived.staticField).toBe(3)

		const d = new Derived(66)

		expect(d.baseField).toBe(66)
		expect(d.derivedField).toBe(8)

		const ld = new LazyDerived(55)

		expect(ld.baseField).toBe(55)
		expect(ld.derivedField).toBe(8)

		//

		expect(d instanceof Derived).toBeTruthy()
		expect(ld instanceof LazyDerived).toBeTruthy()

		expect(d instanceof BaseX).toBeTruthy()
		expect(ld instanceof BaseX).toBeTruthy()

		//

		expect(Object.getPrototypeOf(LazyDerived).name).toBe(
			'lazyConstructor(BaseX)',
		)

		//

		expect(Object.getPrototypeOf(d)).toBe(Derived.prototype)
		expect(Object.getPrototypeOf(ld)).toBe(LazyDerived.prototype)

		//

		expect(Object.getPrototypeOf(Object.getPrototypeOf(d))).toBe(
			BaseX.prototype,
		)

		// expect(Object.getPrototypeOf(Object.getPrototypeOf(ld))).toBe(
		// 	BaseX.prototype,
		// )

		// ! Chain is longer!
		expect(
			Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(ld))),
		).toBe(BaseX.prototype)
	})

	it('works with `lazyValue`', () => {
		expect.hasAssertions()

		const d = lazyValue(() => new Derived(66))
		const ld = lazyValue(() => new LazyDerived(66))

		expect(d.baseField).toBe(66)
		expect(ld.baseField).toBe(66)

		expect(d.derivedField).toBe(8)
		expect(ld.derivedField).toBe(8)

		expect(d instanceof BaseX).toBeTruthy()
		// expect(ld instanceof BaseX).toBeTruthy()
		// expect(ld instanceof LazyDerived).toBeTruthy()
	})

	it('name', () => {
		expect.hasAssertions()

		const ctor = lazyConstructor(() => BaseX)

		expect(ctor.name).toBe('lazyConstructor(BaseX)')
	})
})
