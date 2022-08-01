// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { Assert, Is } from '~/type'

import type { Callable } from './Callable'

describe('Callable', () => {
	it('works', () => {
		expect.assertions(0)

		Assert.isSubtype<(x: number) => number, Callable>()

		Assert(
			Is<Callable>() //
				.identicalTo<(...args: any[]) => unknown>(),

			Is<Callable<[number, string]>>() //
				.identicalTo<(a: number, b: string) => unknown>(),

			Is<Callable<[], number>>() //
				.identicalTo<() => number>(),

			Is<Callable<[number], string, bigint>>() //
				.identicalTo<(this: bigint, a: number) => string>(),
		)
	})
})
