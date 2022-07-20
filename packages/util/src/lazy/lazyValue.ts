// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { undef } from '../nullish'

/* eslint-disable max-lines-per-function */
/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */

export function lazyValue<T extends object>(getValue: () => T): T {
	let value: T

	// Has to be an arrow function, since it doesn't define prototype
	const obj = () => {}
	// function obj() {}

	// delete obj.length
	// delete obj.name
	// obj.prototype = {}
	// Object.defineProperty(obj, 'prototype', { configurable: true })

	function load() {
		if (typeof value === 'undefined') {
			value = getValue()
			// assign(obj, value)
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

			const original = Object.getOwnPropertyDescriptor(obj, p)
			const override = Reflect.getOwnPropertyDescriptor(value, p)

			if (original?.configurable === false) {
				return { ...original, ...override, configurable: original.configurable }
			} else if (!original || original.configurable === true) {
				if (override) return { ...override, configurable: true }
				else return undef
			} else return override
			// return { ...original, ...override, configurable: original.configurable }
		},

		ownKeys(target) {
			load()

			const result = Reflect.ownKeys(value)

			const moreKeys = Object.entries(Object.getOwnPropertyDescriptors(target))
				.filter(([_property, descriptor]) => !descriptor.configurable)
				.map(entry => entry[0])

			return [...new Set([...result, ...moreKeys])]
		},

		construct(_t, args, newTarget) {
			load()
			return Reflect.construct(value as any, args, newTarget)
		},

		apply(_t, thisArg, argArray) {
			load()
			return Reflect.apply(value as any, thisArg, argArray)
		},
	}) as never
}
