// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsEqual } from '../type'
import { Assert } from '../type'
import type { Join } from './Join.js'

describe('join', () => {
	it('works', () => {
		expect.assertions(0)

		type A = Join<['asd', 'sdf'], '/'>
		Assert<IsEqual<A, 'asd/sdf'>>()

		Assert<IsEqual<Join<['a', 'b', 'c', 'd'], '/'>, 'a/b/c/d'>>()
		Assert<IsEqual<Join<['a', 'b', 'c', 'd']>, 'abcd'>>()
		Assert<IsEqual<Join<['a', 'b', 'c', 'd'], ''>, 'abcd'>>()
	})
})
