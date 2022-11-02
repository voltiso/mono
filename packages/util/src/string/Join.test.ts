// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsEqual, IsIdentical } from '~'
import { $Assert } from '~/$strip'

import type { Join } from './Join'

describe('join', () => {
	it('works', () => {
		expect.assertions(0)

		type A = Join<['asd', 'sdf'], { separator: '/' }>
		$Assert<IsEqual<A, 'asd/sdf'>>()

		$Assert<
			IsEqual<Join<['a', 'b', 'c', 'd'], { separator: '/' }>, 'a/b/c/d'>
		>()

		$Assert<IsEqual<Join<['a', 'b', 'c', 'd']>, 'abcd'>>()

		$Assert<IsEqual<Join<['a', 'b', 'c', 'd'], { separator: '' }>, 'abcd'>>()
	})

	it('works with `string` supertype', () => {
		type A = Join<['asd', string], { separator: '|' }>
		$Assert<IsIdentical<A, `asd|${string}`>>()
	})

	// ! TODO
	// eslint-disable-next-line jest/no-commented-out-tests
	// it('handles unknown tails', () => {
	// 	type A = Join<['a', 'b', ...string[]], {separator: '|'}>
	// })
})
