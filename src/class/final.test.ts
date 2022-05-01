/* eslint-disable class-methods-use-this */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-classes-per-file */
import { final } from './final'

class Base {
	constructor() {
		final(this, Base, 'f')
	}

	f() {
		return 123
	}
}

class Good extends Base {}

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
	})
})
