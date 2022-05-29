/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable func-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { assign } from './modules/object'

/* eslint-disable max-params */
export function lazyValue<T extends object>(getValue: () => T): T {
	let value: T

	/** Has to be an arrow function, since it doesn't define prototype */
	const obj = ((...args: unknown[]) => {
		load()
		return (value as any)(...args) as never
	}) as any

	// delete obj.length
	// delete obj.name
	obj.prototype = {}

	function load() {
		if (typeof value === 'undefined') {
			value = getValue()
			assign(obj, value)
		}
	}

	return new Proxy(obj, {
		get(_t, p) {
			load()
			return Reflect.get(value, p, value) as unknown
		},

		set(_t, p, v) {
			load()
			return Reflect.set(value, p, v, value)
		},

		getPrototypeOf(_t) {
			load()
			return Reflect.getPrototypeOf(value)
		},

		getOwnPropertyDescriptor(_t, p) {
			load()
			return Reflect.getOwnPropertyDescriptor(value, p)
		},

		ownKeys(_t) {
			load()
			return Reflect.ownKeys(value)
		},

		construct(_t, args, newTarget) {
			load()
			return Reflect.construct(value as any, args, newTarget)
		},
	}) as never
}
