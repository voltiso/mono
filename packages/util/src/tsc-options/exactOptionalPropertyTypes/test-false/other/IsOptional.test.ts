// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '_'
import { describe, expect, it } from '@jest/globals'

import type { IsOptional } from '~'

describe('isOptional', () => {
	it('works', () => {
		expect.assertions(0)

		$Assert.is<IsOptional<{ a?: 1; b: 2 }, 'a'>, true>()
		$Assert.is<IsOptional<{ a: 1; b: 2 }, 'a'>, false>()
		$Assert.is<IsOptional<{ a?: 1 | undefined; b: 2 }, 'a'>, true>()
		$Assert.is<IsOptional<{ a: 1 | undefined; b: 2 }, 'a'>, false>()
	})

	// eslint-disable-next-line jest/no-commented-out-tests
	// it('generics', <T extends { a?: 1 }>() => {
	// 	expect.assertions(0)

	// 	type A0 = IsOptional<{ a?: 1 }, 'a'>
	// 	$Assert.is<A0, true>()

	// 	type A1 = IsOptional<{ a?: 1 }, 'a'>
	// 	$Assert.is<A1, true>()

	// 	//

	// 	type B0 = IsOptional<T, 'a'>
	// 	$Assert.is<B0, true>()

	// 	type B1 = IsOptional<T, 'a'>
	// 	$Assert<B1, true>()
	// })
})
