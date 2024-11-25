// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import type { GetUnknownPathTokens } from './getUnknownPathTokens'
import { getUnknownPathTokens } from './getUnknownPathTokens'

describe('getUnknownPathTokens', () => {
	it('type', () => {
		expect.assertions(0)

		type A = GetUnknownPathTokens<'a{a} df dfg   {test}   *   **    *'>
		$Assert<IsIdentical<A, ['a', 'test', '*', '**', '*']>>()
	})

	it('empty', () => {
		expect.hasAssertions()

		const a = getUnknownPathTokens('a/b/c')

		expect(a).toStrictEqual([])

		$Assert<IsIdentical<typeof a, []>>()
	})

	it('named', () => {
		expect.hasAssertions()

		const a = getUnknownPathTokens('a/{a}/c/{test}')

		expect(a).toStrictEqual(['a', 'test'])

		$Assert<IsIdentical<typeof a, ['a', 'test']>>()
	})

	it('wildcard', () => {
		expect.hasAssertions()

		const a = getUnknownPathTokens('a/*/c/*')

		expect(a).toStrictEqual(['*', '*'])

		$Assert<IsIdentical<typeof a, ['*', '*']>>()
	})

	it('named and wildcard', () => {
		expect.hasAssertions()

		const a = getUnknownPathTokens('a/*/c/{test}')

		expect(a).toStrictEqual(['*', 'test'])

		$Assert<IsIdentical<typeof a, ['*', 'test']>>()
	})

	it('double-wildcard', () => {
		expect.hasAssertions()

		const a = getUnknownPathTokens('a/**/c/*/{test}')

		expect(a).toStrictEqual(['**', '*', 'test'])

		$Assert<IsIdentical<typeof a, ['**', '*', 'test']>>()
	})
})
