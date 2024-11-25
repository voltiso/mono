// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert, $Is } from '_'
import { describe, expect, it } from '@jest/globals'

import type { AbstractNewable, Newable } from './Newable'

describe('Newable', () => {
	it('works', () => {
		expect.assertions(0)

		$Assert.isSubtype<new (x: number) => number, Newable>()

		$Assert.isSubtype<
			new (x: number) => { a: 1 },
			Newable<{ arguments: number[]; return: { a: 1 } }>
		>()

		$Assert(
			$Is<Newable>() //
				.identicalTo<new (...args: any) => unknown>(),

			$Is<Newable<{ parameters: [number, string] }>>() //
				.identicalTo<new (a: number, b: string) => unknown>(),

			$Is<Newable<{ parameters: []; return: { a: number } }>>() //
				.identicalTo<new () => { a: number }>(),

			//

			$Is<AbstractNewable>() //
				.identicalTo<abstract new (...args: any) => unknown>(),

			$Is<AbstractNewable<{ parameters: [number, string] }>>() //
				.identicalTo<abstract new (a: number, b: string) => unknown>(),

			$Is<AbstractNewable<{ parameters: []; return: { a: number } }>>() //
				.identicalTo<abstract new () => { a: number }>(),
		)
	})
})
