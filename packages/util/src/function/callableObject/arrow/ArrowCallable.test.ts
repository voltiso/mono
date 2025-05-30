// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert, UNSET } from '_'
import { describe, expect, it } from '@jest/globals'

import type { Callable, WithCALL } from '~/function'

import type { ArrowCallable } from './ArrowCallable'
import { CustomArrowCallable } from './ArrowCallable'
import type { ArrowCallableOptions } from './ArrowCallableOptions'

describe('ArrowCallable', () => {
	it('type', <O extends
		| ArrowCallableOptions
		| WithCALL
		| Callable<{ this: void }>
		| UNSET>() => {
		expect.assertions(0)

		$Assert.is<ArrowCallable<O>, ArrowCallable>()
	})

	it('works', () => {
		expect.hasAssertions()

		const a = CustomArrowCallable({
			call: (n: number) => 2 * n,
			shape: { a: 1 },
		})

		expect(a.a).toBe(1)
		expect(a(2)).toBe(4)
	})

	it('proxy', () => {
		expect.hasAssertions()

		const a = CustomArrowCallable({
			call: (x: number) => 2 * x,

			shape: new Proxy(
				{},
				{
					// eslint-disable-next-line sonarjs/function-return-type
					get(_t, p) {
						return p
					},
				},
			),
		})

		expect(a(2)).toBe(4)
		// @ts-expect-error no type
		expect(a.test).not.toBe('test') // does not work!
	})
})
