// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import { $Assert } from '_'

import type { IsEqual, IsIdentical } from '~/type'

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

	// it('handles unknown tails', () => {
	// 	type A = Join<['a', 'b', ...string[]], {separator: '|'}>
	// })
})
