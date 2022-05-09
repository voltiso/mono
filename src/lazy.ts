/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable max-params */
export function lazy<T extends object>(getValue: () => T): T {
	let value: T

	function obj(...args: unknown[]) {
		load()
		return (value as any)(...args) as never
	}

	function load() {
		if (typeof value === 'undefined') {
			value = getValue()
			Object.setPrototypeOf(obj, value)
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
	}) as never
}
