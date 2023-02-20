// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $assert } from '_'

/**
 * Hack to mitigate problems with cyclic dependencies and ES6 class inheritance.
 *
 * This fixes the problem arising e.g. when using `esbuild-runner/jest`.
 *
 * @example
 *
 * ```ts
 * Class Transaction extends lazyConstructor(() => TransactionBase) {
 * ... }
 * ```
 *
 * @param getClass - Function returning a constructor
 * @returns The same constructor (proxy)
 */
export function lazyConstructor<
	Class extends abstract new (...args: any) => object,
>(getClass: () => Class): Class {
	let cls: Class | undefined

	const proxyProto = {}

	// const proxyProto = lazyFunction(() => {
	// 	load(cls)
	// 	return cls.prototype as object
	// })

	function load(c: Class | undefined): asserts c is Class {
		if (!c) {
			cls = getClass()
			$assert(cls, 'lazyConstructor - got nullish constructor provided')
			Object.setPrototypeOf(proxyProto, cls.prototype as never)
			Object.setPrototypeOf(Ctor, cls)
		}
	}

	function Ctor(...args: any) {
		load(cls)
		return Reflect.construct(cls, args as never, new.target) as never
	}

	Ctor.prototype = proxyProto

	return new Proxy(Ctor, {
		get(target, p, receiver) {
			// if (typeof cls === 'undefined' && p === 'prototype')
			if (p === 'prototype') return Reflect.get(target, p, receiver) as never

			load(cls)

			if (p === 'name')
				return `lazyConstructor(${Reflect.get(cls, p, receiver) as string})`

			return Reflect.get(cls, p, receiver) as never
		},

		// construct(_target, args, newTarget) {
		// 	load(cls)
		// 	return Reflect.construct(cls, args, newTarget) as never
		// },

		// getPrototypeOf(_t) {
		// 	load(cls)
		// 	return Reflect.getPrototypeOf(cls)
		// },
	}) as never
}

// // ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// // ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// import { forwardGetOwnPropertyDescriptor, forwardOwnKeys } from '~'

// /* eslint-disable unicorn/consistent-function-scoping */
// /* eslint-disable @typescript-eslint/no-empty-function */
// /* eslint-disable @typescript-eslint/no-unsafe-argument */
// /* eslint-disable @typescript-eslint/no-unsafe-return */

// export function lazyConstructor<T extends object>(getValue: () => T): T {
// 	let value: T

// 	// Has to be an arrow function, since it doesn't define prototype
// 	// const obj = () => {}
// 	function obj() {}

// 	// delete obj.length
// 	// delete obj.name
// 	// obj.prototype = {}
// 	// Object.defineProperty(obj, 'prototype', { configurable: true })

// 	function load() {
// 		if (typeof value === 'undefined') {
// 			value = getValue()
// 			// assign(obj, value)
// 		}
// 	}

// 	return new Proxy(obj, {
// 		get(_t, p) {
// 			load()
// 			return Reflect.get(value, p, value) as unknown
// 		},

// 		set(_t, p, v) {
// 			load()
// 			return Reflect.set(value, p, v, value)
// 		},

// 		getPrototypeOf(_t) {
// 			load()
// 			return Reflect.getPrototypeOf(value)
// 		},

// 		getOwnPropertyDescriptor(target, property) {
// 			load()
// 			return forwardGetOwnPropertyDescriptor(value, target, property)
// 		},

// 		ownKeys(target) {
// 			load()
// 			return forwardOwnKeys(value, target)
// 		},

// 		construct(_t, args, newTarget) {
// 			load()
// 			return Reflect.construct(value as any, args, newTarget)
// 		},

// 		apply(_t, thisArg, argArray) {
// 			load()
// 			return Reflect.apply(value as any, thisArg, argArray)
// 		},
// 	}) as never
// }
