// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert, $Is } from '~/$strip'

import type { Newable } from './Newable'

describe('Newable', () => {
	it('works', () => {
		expect.assertions(0)

		$Assert.isSubtype<abstract new (x: number) => number, Newable>()
		$Assert.isSubtype<new (x: number) => number, Newable>()

		$Assert.isSubtype<
			new (x: number) => { a: 1 },
			Newable<number[], { a: 1 }>
		>()

		$Assert(
			$Is<Newable>() //
				.identicalTo<abstract new (...args: any) => unknown>(),

			$Is<Newable<[number, string]>>() //
				.identicalTo<abstract new (a: number, b: string) => unknown>(),

			$Is<Newable<[], { a: number }>>() //
				.identicalTo<abstract new () => { a: number }>(),
		)
	})
})
