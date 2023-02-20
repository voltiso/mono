// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/no-unnecessary-condition */

import { $assert } from '_/$strip/$assert'

import { getProxyHandlers } from './_/getProxyHandlers'

/** Consider using `lazyFunction` instead if the object is callable */
export function lazyObject<T extends object>(getValue: () => T): T {
	const state = {
		value: undefined as unknown as object,
	}

	const target = {}

	function load() {
		if (state.value === undefined) {
			state.value = getValue()
			$assert(state.value !== undefined, 'lazyObject: got undefined')
			// assign(obj, value)
		}
	}

	return new Proxy(target, getProxyHandlers({ load, state })) as never
}
