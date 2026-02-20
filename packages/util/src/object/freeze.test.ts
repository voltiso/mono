// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'

import { freeze } from './freeze'

class Base {
	a: number

	constructor() {
		this.a = 123
		freeze(this, ['a'])
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
