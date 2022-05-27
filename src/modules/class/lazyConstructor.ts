/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Newable } from '../function'

/**
 * Hack to mitigate problems with cyclic dependencies and ES6 class inheritance.
 *
 * This fixes the problem arising e.g. when using `esbuild-runner/jest`.
 *
 * @example class Transaction extends lazyConstructor(() => TransactionBase) { ... }
 * // this works even if `TransactionBase` is inside a dependency cycle,
 * // and is still `undefined` at the moment when the `Transaction` class is being defined
 */
export function lazyConstructor<Class extends Newable>(
	getCls: () => Class
): Class {
	let Cls: Class | undefined

	const proxyProto = {}

	function load() {
		if (!Cls) {
			Cls = getCls()
			Object.setPrototypeOf(proxyProto, Cls.prototype)
			Object.setPrototypeOf(Ctor, Cls)
		}
		return Cls
	}

	// eslint-disable-next-line func-names
	function Ctor(...args: never[]) {
		const Cls = load()
		return Reflect.construct(Cls, args, new.target)
	}

	Ctor.prototype = proxyProto

	return new Proxy(Ctor, {
		get(target, p, receiver) {
			// console.log('get Ctor', target, p, receiver)
			if (p in target) return Reflect.get(target, p, receiver)
			load()
			return Reflect.get(target, p, receiver)
		},
	}) as never
}
