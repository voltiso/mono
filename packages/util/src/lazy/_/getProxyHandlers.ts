// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/no-unnecessary-condition */

import { forwardGetOwnPropertyDescriptor, forwardOwnKeys } from '~/proxy'

export function getProxyHandlers({
	load,
	state,
}: {
	load: () => void
	state: {
		value: object
	}
}): ProxyHandler<any> {
	return {
		get(_t, p) {
			// ! required for `react-native` - metro bundler calls `.$$typeof` immediately to register for react hot reload
			if (state.value === undefined && p === '$$typeof') return undefined
			load()
			return Reflect.get(state.value, p, state.value) as unknown
		},

		set(_t, p, v) {
			load()
			return Reflect.set(state.value, p, v, state.value)
		},

		getPrototypeOf(_t) {
			load()
			return Reflect.getPrototypeOf(state.value)
		},

		getOwnPropertyDescriptor(target: object, property) {
			load()
			return forwardGetOwnPropertyDescriptor(state.value, target, property)
		},

		ownKeys(target: object) {
			load()
			return forwardOwnKeys(state.value, target)
		},

		construct(_t, args, newTarget) {
			load()
			return Reflect.construct(state.value as never, args, newTarget) as never
		},

		apply(_t, thisArg, argArray) {
			load()
			return Reflect.apply(state.value as never, thisArg, argArray) as never
		},
	}
}
