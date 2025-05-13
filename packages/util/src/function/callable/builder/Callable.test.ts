// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert, $Is } from '_'
import { describe, expect, it } from '@jest/globals'

import type { IsIdentical } from '~/type/compare'

import type { Callable } from './Callable'
import type { CallableOptions } from './CallableOptions'

describe('Callable', () => {
	it('generic', <O extends Partial<CallableOptions>>() => {
		expect.assertions(0)

		$Assert.is<Callable<O>, Callable>()
	})

	it('works', () => {
		expect.assertions(0)

		$Assert.is<(x: number) => number, Callable>()

		$Assert(
			$Is<Callable>() //
				.identicalTo<(...args: any) => void>(),

			$Is<Callable<{ return: unknown; parameters: [number, string] }>>() //
				.identicalTo<(a: number, b: string) => unknown>(),

			$Is<Callable<{ return: number; parameters: [] }>>() //
				.identicalTo<() => number>(),

			$Is<Callable<{ return: string; parameters: [number]; this: bigint }>>() //
				.identicalTo<(this: bigint, a: number) => string>(),
		)
	})

	it('default', <This, Params extends never[], Return>() => {
		type A = Callable<{}>
		$Assert<IsIdentical<A, (...args: any[]) => void>>()

		type AnyCallable = Callable<{
			this: This
			parameters: Params
			return: Return
		}>

		$Assert.is<AnyCallable, (...args: any) => unknown>()
		$Assert.is<AnyCallable, (...args: any) => void>()

		$Assert.is<AnyCallable, Callable>()
	})

	it('readonly parameters - strip readonly', () => {
		type X = Parameters<(...args: readonly 123[]) => string>
		$Assert<IsIdentical<X, never>>() // !

		type Y = Parameters<(...args: 123[]) => string>
		$Assert<IsIdentical<Y, 123[]>>()

		//

		type A = Callable<{ parameters: readonly 123[] }>
		$Assert<IsIdentical<A, (...args: 123[]) => void>>()
	})
})
