// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '~/$strip'
import type { IsIdentical } from '~/type'

import type { Assume } from './Assume'

describe('Assume', () => {
	it('type', () => {
		expect.assertions(0)

		$Assert<IsIdentical<Assume<number, 123>, 123>>()
		$Assert<IsIdentical<Assume<number, number>, number>>()

		$Assert<IsIdentical<Assume<123, number>, never>>()
	})

	it('generic', <Str extends string>() => {
		expect.assertions(0)

		type A = Assume<'a' | 'b', Str>
		$Assert.is<A, 'a' | 'b'>()

		type B = Assume<1 | 2 | 3, Str>
		$Assert.is<B, never>()

		type C = Assume<Str, 'a' | 'b'>
		$Assert.is<C, 'a' | 'b'>()
		$Assert.is<C, Str>()
	})
})
