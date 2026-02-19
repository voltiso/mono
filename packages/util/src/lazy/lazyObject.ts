// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/no-unnecessary-condition */

import { $fastAssert } from '_/$strip/$assert'

import { getProxyHandlers } from './_/getProxyHandlers'

/**
 * - Consider using `lazyFunction` instead if the object is callable
 * - ⚠️ Does not work with react components - returns `undefined` for `.$$typeof`
 *
 *   - Work-around for `react-native` - metro bundler calls `.$$typeof` immediately
 *       to register for react hot reload
 *   - Work-around for `react`: `.prototype` returns Object.prototype even though
 *       it's not a class constructor (for this use lazyConstructor)
 */
export function lazyObject<T extends object>(getValue: () => T): T {
	const state = {
		value: undefined as unknown as object,
	}

	const target = {}

	function load() {
		if (state.value === undefined) {
			state.value = getValue()

			$fastAssert(state.value !== undefined, 'lazyObject: got undefined')
			// assign(obj, value)
		}
	}

	return new Proxy(target, getProxyHandlers({ load, state })) as never
}
