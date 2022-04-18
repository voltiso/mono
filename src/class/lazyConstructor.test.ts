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
}

class LazyDerived extends lazyConstructor(() => Base) {
	derivedField = 8
}

describe('lazyConstructor', () => {
	it('works', () => {
		expect.hasAssertions()

		expect(Base.staticField).toBe(3)
		expect(Derived.staticField).toBe(3)
		expect(LazyDerived.staticField).toBe(3)

		const d = new LazyDerived(55)
		expect(d.baseField).toBe(55)
		expect(d.derivedField).toBe(8)
	})
})
