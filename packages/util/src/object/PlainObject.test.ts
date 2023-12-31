// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '_'

import { fastAssert } from '~/assert'

import type { PlainObject } from './PlainObject'
import { isPlainObject } from './PlainObject'

// type PlainObject = {
// 	[x: number]: never
// }

describe('PlainObject', () => {
	it('works', () => {
		expect.assertions(0)

		const obj = { a: 1 }

		fastAssert(isPlainObject(obj))

		$Assert.is<typeof obj, PlainObject>()
	})
})
