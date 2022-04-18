/* eslint-disable max-classes-per-file */
import { lazyConstructor } from './lazyConstructor'

/* eslint-disable no-magic-numbers */
class Base {
	static staticField = 3

	baseField = 0

	constructor(x: number) {
		this.baseField = x
	}
}

class Derived extends Base {
	derivedField = 8

	derivedField2 = 1

	constructor(x: number) {
		super(x)

		this.derivedField2 = this.getValue()
	}

	// eslint-disable-next-line class-methods-use-this
	getValue() {
		return 99
	}
}

class LazyDerived extends lazyConstructor(() => Base) {
	derivedField = 8

	derivedField2 = 1

	constructor(x: number) {
		super(x)

		this.derivedField2 = this.getValue()
	}

	// eslint-disable-next-line class-methods-use-this
	getValue() {
		return 99
	}
}

describe('lazyConstructor', () => {
	it('works', () => {
		expect.hasAssertions()

		expect(Base.staticField).toBe(3)
		expect(Derived.staticField).toBe(3)
		expect(LazyDerived.staticField).toBe(3)

		const d = new Derived(66)
		expect(d.baseField).toBe(66)
		expect(d.derivedField).toBe(8)

		const ld = new LazyDerived(55)
		expect(ld.baseField).toBe(55)
		expect(ld.derivedField).toBe(8)
	})
})
