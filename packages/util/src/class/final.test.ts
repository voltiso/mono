// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'

import { final } from './final'

class Base {
	a = 0

	constructor(fail = false) {
		final(this, Base, ['f', 'g', 'h'])

		if (fail) final(this, Base, ['a'])
	}

	f() {
		return 'f'
	}

	// @ts-expect-error unused
	// eslint-disable-next-line @typescript-eslint/no-unused-private-class-members
	private g() {
		return 'g'
	}

	protected h() {
		return 'h'
	}
}

class Good extends Base {
	constructor(fail = false) {
		super(fail)
	}
}

class Bad extends Base {
	override f() {
		return 'ff'
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
