// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '~/$strip'
import type { CanBeUndefined } from '~/object'
import type { exactOptionalPropertyTypes } from '~/tsc-options'
import type { IsIdentical } from '~/type'

// eslint-disable-next-line jest/require-hook
$Assert.is<exactOptionalPropertyTypes, false>() // !

describe('canBeUndefined', () => {
	it('generics', <T extends { a?: 1 }>() => {
		expect.assertions(0)

		type A0 = CanBeUndefined<{ a?: 1 }, 'a'>
		$Assert<IsIdentical<A0, boolean>>()

		type A1 = CanBeUndefined<{ a?: 1 }, 'a'>
		$Assert<IsIdentical<A1, boolean>>()

		//

		type B0 = CanBeUndefined<T, 'a'>
		$Assert<IsIdentical<B0, boolean>>()

		type B1 = CanBeUndefined<T, 'a'>
		$Assert<IsIdentical<B1, boolean>>()
	})
})
