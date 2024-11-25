// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'

import { $Assert, $Is } from './$Assert'

describe('$Assert', () => {
	it('works', <U extends number>() => {
		expect.assertions(0)

		$Assert(
			$Is<123>().subtypeOf<number>(),
			$Is('123' as const).not.subtypeOf<number>(),
			$Is<number>().not.strictSubtypeOf<number>(),
			$Is(123 as const).strictSubtypeOf<number>(),
			//
			$Is<U>().subtypeOf<number>(),
			$Is<U>()<number>(),
			// Sometimes(Type<123>().is.subtypeOf<U>()),
			// Sometimes(Type<'123'>().is.subtypeOf<U>())
		)

		$Assert.isSubtype<123, number>()

		// @ts-expect-error is not subtype - error
		$Assert.isSubtype<'123', number>()

		$Assert.isSupertype<number, 123>()

		// @ts-expect-error is not subtype - error
		$Assert.isSupertype<number, '123'>()

		//

		$Assert(
			$Is<{ a: 1 }>().not.nonStrictEqualTo<{ a?: 1 }>(),
			$Is<{ a: 1 }>().not.nonStrictEqualTo<{ a?: 1 | undefined }>(),
			$Is<{ a: 1 }>().not.nonStrictEqualTo<{ a: 1 | undefined }>(),
			$Is<{ a: 1 | undefined }>().nonStrictEqualTo<{ a?: 1 }>(),
			$Is<{ a: 1 | undefined }>().nonStrictEqualTo<{ a?: 1 | undefined }>(),
			//
		)
	})
})
