// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import { $Assert } from '_'

import type { exactOptionalPropertyTypes } from '~/tsc-options'

import type { CanBeUndefined } from './CanBeUndefined'

$Assert.is<exactOptionalPropertyTypes, true>()

describe('canBeUndefined', () => {
	it('works', () => {
		expect.assertions(0)

		$Assert.is<CanBeUndefined<{ a: 1; x: 0 }, 'a'>, false>()
		$Assert.is<CanBeUndefined<{ a: 1 | undefined; x: 0 }, 'a'>, true>()
		$Assert.is<CanBeUndefined<{ a?: 1; x: 0 }, 'a'>, false>()
		$Assert.is<CanBeUndefined<{ a?: 1 | undefined; x: 0 }, 'a'>, true>()

		$Assert.is<CanBeUndefined<{ a: 1; x: 0 }, 'a'>, false>()
		$Assert.is<CanBeUndefined<{ a: 1 | undefined; x: 0 }, 'a'>, true>()
		$Assert.is<CanBeUndefined<{ a?: 1; x: 0 }, 'a'>, false>()
		$Assert.is<CanBeUndefined<{ a?: 1 | undefined; x: 0 }, 'a'>, true>()
	})

	it('generics', <T extends { a?: 1 }>() => {
		expect.assertions(0)

		type A0 = CanBeUndefined<{ a?: 1 }, 'a'>
		$Assert.is<A0, false>()

		type A1 = CanBeUndefined<{ a?: 1 }, 'a'>
		$Assert.is<A1, false>()

		//

		type B0 = CanBeUndefined<T, 'a'>
		$Assert.is<B0, false>()

		type B1 = CanBeUndefined<T, 'a'>
		$Assert.is<B1, false>()
	})
})
