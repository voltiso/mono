/* eslint-disable max-classes-per-file */
/* eslint-disable no-magic-numbers */

import { freeze } from './freeze'

class Base {
	a: number

	constructor() {
		this.a = 123
		freeze(this, 'a')
	}
}

class DerivedField extends Base {
	constructor() {
		super()
		this.a = 444
	}
}

describe('freeze', () => {
	it('works', () => {
		expect.hasAssertions()

		expect(() => new DerivedField()).toThrow('read only')
	})
})
