// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '_'
import { describe, expect, it } from '@jest/globals'

import type { strictNullChecks } from '~/tsc-options'

import type { IsOptional } from './IsOptional'

describe('isOptional', () => {
	it('works', () => {
		expect.assertions(0)

		$Assert<strictNullChecks>() // tests for `strictNullChecks` `false` are separate

		type A = IsOptional<{ a?: 1; b: 2 }, 'a'>
		$Assert<A, true>()
		$Assert.is<IsOptional<{ a: 1; b: 2 }, 'a'>, false>()
		$Assert<IsOptional<{ a?: 1 | undefined; b: 2 }, 'a'>, true>()
		$Assert.is<IsOptional<{ a: 1 | undefined; b: 2 }, 'a'>, false>()
	})

	// ! the example below works differently in new TS
	// eslint-disable-next-line jest/no-commented-out-tests
	// it('generics', <T extends { a?: 1 }>() => {
	// 	expect.assertions(0)

	// 	type A0 = IsOptional<{ a?: 1 }, 'a'>
	// 	$Assert.is<A0, true>()

	// 	type A1 = IsOptional<{ a?: 1 }, 'a'>
	// 	$Assert.is<A1, true>()

	// 	//

	// 	// type IsOptional_<T, K, True = true, False = false> = K extends $Keyof<T>
	// 	//  	? IsOptional<T, K, True, False>
	// 	//  	: never

	// 	// type BB0 = IsOptional_<T, 'a'>
	// 	// $Assert.is<BB0, true>()

	// 	// ! the example below works differently in new TS
	// 	// it's now neither `true` nor `false` nor `boolean`

	// 	// type B0 = IsOptional<T, 'a'>
	// 	// $Assert.is<B0, true>()

	// 	// type B1 = IsOptional<T, 'a'>
	// 	// $Assert.is<B1, true>()
	// })
})
