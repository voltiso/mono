// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Newable } from '../function'

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
 * @param getCls - Function returning a constructor
 * @returns The same constructor (proxy)
 */
export function lazyConstructor<Class extends Newable>(
	getCls: () => Class,
): Class {
	let cls: Class | undefined

	const proxyProto = {}

	function load() {
		if (!cls) {
			cls = getCls()
			Object.setPrototypeOf(proxyProto, cls.prototype as never)
			Object.setPrototypeOf(Ctor, cls)
		}

		return cls
	}

	function Ctor(...args: never[]) {
		const Cls = load()
		return Reflect.construct(Cls, args, new.target) as never
	}

	Ctor.prototype = proxyProto

	return new Proxy(Ctor, {
		get(target, p, receiver) {
			// console.log('get Ctor', target, p, receiver)
			if (p in target) return Reflect.get(target, p, receiver) as never

			load()
			return Reflect.get(target, p, receiver) as never
		},
	}) as never
}
