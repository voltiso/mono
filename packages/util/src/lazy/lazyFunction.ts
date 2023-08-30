// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable unicorn/consistent-function-scoping */

import { $assert } from '_'

import { getProxyHandlers } from './_/getProxyHandlers'

/**
 * - Consider using `lazyObject` instead if the lazy value is not callable
 * - ⚠️ Does not work with react components - returns `undefined` for `.$$typeof`
 *
 *   - Work-around for `react-native` - metro bundler calls `.$$typeof` immediately
 *       to register for react hot reload
 */
export function lazyFunction<T extends (...args: any) => any>(
	getValue: () => T,
): T {
	const state = {
		value: undefined as unknown as object,
	}

	// Has to be an arrow function, since it doesn't define prototype
	// eslint-disable-next-line no-empty-function
	const target = () => {}

	function load() {
		if (state.value === undefined) {
			state.value = getValue()
			$assert(state.value !== undefined, 'lazyFunction: got undefined')
			// assign(obj, value)
		}
	}

	return new Proxy(target, getProxyHandlers({ load, state })) as never
}
