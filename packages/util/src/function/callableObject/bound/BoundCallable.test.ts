// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '_'

import type { IBoundCallable, WithSelfBoundCALL } from '..'
import { CALL } from '..'
import type { BoundCallable, CustomBoundCallable } from './BoundCallable'
import type { BoundCallableOptions } from './BoundCallableOptions'

describe('BoundCallable', () => {
	it('interface complete', () => {
		// eslint-disable-next-line etc/no-internal
		$Assert.is<keyof BoundCallable<WithSelfBoundCALL>, keyof IBoundCallable>()
		// eslint-disable-next-line etc/no-internal
		$Assert.is<keyof IBoundCallable, keyof BoundCallable<WithSelfBoundCALL>>()

		$Assert.is<
			keyof CustomBoundCallable<BoundCallableOptions>,
			// eslint-disable-next-line etc/no-internal
			keyof IBoundCallable
		>()
		$Assert.is<
			// eslint-disable-next-line etc/no-internal
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

		// eslint-disable-next-line etc/no-internal
		$Assert.is<BoundCallable<X>, IBoundCallable>()
		$Assert.is<BoundCallable<X>, BoundCallable>()
	})
})
