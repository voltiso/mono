// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert, $Is } from '_'

import type { Constructor } from './Constructor'

describe('Constructor', () => {
	it('works', () => {
		expect.assertions(0)

		$Assert.is<new (x: number) => { a: 0 }, Constructor>()

		$Assert(
			$Is<
				Constructor<{
					parameters: [number, string]
					return: { a: 0 }
				}>['prototype']
			>() //
				.identicalTo<{ a: 0 }>(),
		)
	})
})
