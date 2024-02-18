// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '_'

import type { IsOptional } from './IsOptional'

describe('isOptional', () => {
	it('works', () => {
		expect.assertions(0)

		$Assert<IsOptional<{ a?: 1; b: 2 }, 'a'>, true>()
		$Assert.is<IsOptional<{ a: 1; b: 2 }, 'a'>, false>()
		$Assert<IsOptional<{ a?: 1 | undefined; b: 2 }, 'a'>, true>()
		$Assert.is<IsOptional<{ a: 1 | undefined; b: 2 }, 'a'>, false>()
	})

	it('generics', <T extends { a?: 1 }>() => {
		expect.assertions(0)

		type A0 = IsOptional<{ a?: 1 }, 'a'>
		$Assert.is<A0, true>()

		type A1 = IsOptional<{ a?: 1 }, 'a'>
		$Assert.is<A1, true>()

		//

		type B0 = IsOptional<T, 'a'>
		$Assert.is<B0, true>()

		type B1 = IsOptional<T, 'a'>
		$Assert.is<B1, true>()
	})
})
