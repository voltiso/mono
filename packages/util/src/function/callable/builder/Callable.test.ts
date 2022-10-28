// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert, $Is } from '~/$strip'

import type { Callable } from './Callable'
import type { CallableOptions } from './CallableOptions'

describe('Callable', () => {
	it('generic', <O extends Partial<CallableOptions>>() => {
		expect.assertions(0)

		$Assert.is<Callable<O>, Callable>()
	}),
		it('works', () => {
			expect.assertions(0)

			$Assert.is<(x: number) => number, Callable>()

			$Assert(
				$Is<Callable>() //
					.identicalTo<(...args: any) => unknown>(),

				$Is<Callable<{ return: unknown; arguments: [number, string] }>>() //
					.identicalTo<(a: number, b: string) => unknown>(),

				$Is<Callable<{ return: number; arguments: [] }>>() //
					.identicalTo<() => number>(),

				$Is<Callable<{ return: string; arguments: [number]; this: bigint }>>() //
					.identicalTo<(this: bigint, a: number) => string>(),
			)
		})
})
