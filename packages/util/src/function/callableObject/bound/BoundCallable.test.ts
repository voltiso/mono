// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import { $Assert } from '_'

import type { WithSelfBoundCALL } from '../CALL'
import { CALL } from '../CALL'
import type { IBoundCallable } from './_/BoundCallableType'
import type { CustomBoundCallable } from './BoundCallable'
import { BoundCallable } from './BoundCallable'
import type { BoundCallableOptions } from './BoundCallableOptions'

describe('BoundCallable', () => {
	it('interface complete', () => {
		$Assert.is<keyof BoundCallable<WithSelfBoundCALL>, keyof IBoundCallable>()

		$Assert.is<keyof IBoundCallable, keyof BoundCallable<WithSelfBoundCALL>>()

		$Assert.is<
			keyof CustomBoundCallable<BoundCallableOptions>,
			keyof IBoundCallable
		>()
		$Assert.is<
			Exclude<keyof IBoundCallable, CALL>,
			keyof CustomBoundCallable<BoundCallableOptions>
		>()
	})

	it('generic', <Options extends BoundCallableOptions>() => {
		$Assert.is<CustomBoundCallable<Options>, BoundCallable>()
	})

	it('generic 2', <X extends WithSelfBoundCALL>() => {
		interface Sample {
			[CALL](...args: any): any
			clone(): this
		}

		$Assert.is<BoundCallable<Sample>, BoundCallable>()

		$Assert.is<BoundCallable<X>, IBoundCallable>()
		$Assert.is<BoundCallable<X>, BoundCallable>()
	})

	it('bind-call-apply - for compatibility with react-native', () => {
		const obj = {
			a: 10,

			[CALL](str: string): number {
				return str.length + this.a
			},
		}

		const callable = BoundCallable(obj)

		expect(callable('hello')).toBe(15)

		expect(callable.call(null, 'hello')).toBe(15) // bound anyway
	})
})
