import { callableObject, Parameters_ } from '../function'

export const CALL = Symbol('CALL')
export type CALL = typeof CALL

type WithCall = {
	[CALL](this: object, ...args: never[]): unknown
}

/**
 * Define classes with callable instances.
 *
 * @see `callableInstance.test.ts`
 *
 * @example
 * class Foo {
 *   constructor(){
 *     return callableInstance(this)
 *   }
 *
 *   [CALL](x: number) {
 *     return 2 * x
 *   }
 * }
 *
 * const foo = new Foo()
 *
 * console.log(foo(3)) // 6
 */
export function callableInstance<This extends WithCall>(thisArg: This): CallableInstance<This> {
	// eslint-disable-next-line func-style
	const f = (...args: Parameters_<This[CALL]>) => {
		return thisArg[CALL](...args)
	}

	return callableObject(thisArg, f)
}

export type CallableInstance<This extends WithCall> = This & This[CALL]
