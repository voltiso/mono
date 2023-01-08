// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '~/$strip'
import type { IsIdentical } from '~/type'

import type { Split } from './Split'

/* eslint-disable jest/no-commented-out-tests */

describe('split', () => {
	it('simple', () => {
		expect.assertions(0)

		type A = Split<'asd/sdf/dfg', { separator: '/' }>
		$Assert<IsIdentical<A, readonly ['asd', 'sdf', 'dfg']>>()
	})

	it('non-literal', () => {
		expect.assertions(0)

		type B = Split<string, { separator: '/' }>
		$Assert<IsIdentical<B, readonly string[]>>()
	})

	it('no separator specified', () => {
		expect.assertions(0)

		type C = Split<'a/b'>
		$Assert<IsIdentical<C, readonly ['a', '/', 'b']>>()
	})

	// not working:

	// it('non-literal extending string', () => {
	// 	type D = Split<string & { myExtension: () => void }>
	// 	Assert<IsIdentical<D, readonly string[]>>()
	// })

	// it('literal extending string', () => {
	// 	type E = Split<'a/b' & { myExtension: () => void }, '/'>
	// 	Assert<IsIdentical<E, readonly ['a', 'b']>>()
	// })
})
