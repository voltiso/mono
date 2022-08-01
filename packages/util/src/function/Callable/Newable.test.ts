// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { Assert, Is } from '~/type'

import type { Newable } from './Newable'

describe('Newable', () => {
	it('works', () => {
		expect.assertions(0)

		Assert.isSubtype<abstract new (x: number) => number, Newable>()
		Assert.isSubtype<new (x: number) => number, Newable>()

		Assert(
			Is<Newable>() //
				.identicalTo<abstract new (...args: any[]) => unknown>(),

			Is<Newable<[number, string]>>() //
				.identicalTo<abstract new (a: number, b: string) => unknown>(),

			Is<Newable<[], number>>() //
				.identicalTo<abstract new () => number>(),
		)
	})
})
