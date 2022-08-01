// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { Assert } from '~/type'

import type { PlainObject } from '.'

// type PlainObject = {
// 	[x: number]: never
// }

describe('PlainObject', () => {
	it('works', () => {
		expect.assertions(0)

		Assert.is<{ a: 1 }, PlainObject>()

		// interface I {
		// 	a: 1
		// }
		// Assert.is<I, PlainObject>() // !

		type T = { a: 1 }
		Assert.is<T, PlainObject>()
	})
})
