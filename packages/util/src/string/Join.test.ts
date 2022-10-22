// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsEqual } from '~'
import { $Assert } from '~/$strip'

import type { Join } from './Join'

describe('join', () => {
	it('works', () => {
		expect.assertions(0)

		type A = Join<['asd', 'sdf'], '/'>
		$Assert<IsEqual<A, 'asd/sdf'>>()

		$Assert<IsEqual<Join<['a', 'b', 'c', 'd'], '/'>, 'a/b/c/d'>>()
		$Assert<IsEqual<Join<['a', 'b', 'c', 'd']>, 'abcd'>>()
		$Assert<IsEqual<Join<['a', 'b', 'c', 'd'], ''>, 'abcd'>>()
	})
})
