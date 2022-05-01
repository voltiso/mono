/* eslint-disable class-methods-use-this */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-classes-per-file */
import { final } from './final'

class Base {
	a = 0

	constructor(fail = false) {
		final(this, Base, 'f')

		// @ts-expect-error not a method
		if (fail) final(this, Base, 'a')
	}

	f() {
		return 123
	}
}

class Good extends Base {
	constructor(fail = false) {
		super(fail)
	}
}

class Bad extends Base {
	override f() {
		return 234
	}
}

describe('freeze', () => {
	it('works', () => {
		expect.hasAssertions()

		expect(() => new Bad()).toThrow('final')
		expect(() => new Good()).not.toThrow()

		expect(() => new Good(true)).toThrow('not a method')
	})
})
