// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Parameters_ } from '../function'
import { callableObject } from '../function'

export const CALL = Symbol('CALL')
export type CALL = typeof CALL

interface WithCall {
	[CALL](this: object, ...args: never[]): unknown
}

/**
 * Define classes with callable instances.
 *
 * @example
 *
 * ```ts
 * class Foo {
 * 	constructor() {
 * 		return callableInstance(this)
 * 	}
 *
 * 	[CALL](x: number) {
 * 		return 2 * x
 * 	}
 * }
 *
 * const foo = new Foo()
 *
 * console.log(foo(3)) // 6
 * ```
 *
 * @param thisArg - `this` - in a constructor
 * @returns New instance (to be returned from your constructor)
 * @see `callableInstance.test.ts`
 */
export function callableInstance<This extends WithCall>(
	thisArg: This,
): CallableInstance<This> {
	//! do not transpile to `function(){}` - don't want to include non-configurable `prototype` property
	// eslint-disable-next-line security/detect-object-injection
	const f = (...args: Parameters_<This[CALL]>) => thisArg[CALL].call(f, ...args)

	return callableObject(thisArg, f)
}

export type CallableInstance<This extends WithCall> = This & This[CALL]
