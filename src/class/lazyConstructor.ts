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
export function lazyConstructor<Class extends Newable>(getCls: () => Class) {
	// eslint-disable-next-line func-names
	return function (...args: never[]) {
		const Cls = getCls()
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return Reflect.construct(Cls, args, Cls)
	} as unknown as Class
}
