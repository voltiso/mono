// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $fastAssert } from '_'

import type { clone } from '~/clone'
import type { ArrowCallable, Callable } from '~/function'
import { tryDeleteAllProperties } from '~/object'

import type { ProtoCallable } from '../proto'

export type __unused_EmptyArrowCallable = ProtoCallable | typeof clone

/**
 * Create a function with no own properties
 *
 * - ✅ Works with {@link clone}()
 * - ✅ Cleans-up all own properties
 * - ❌ Does not allow `this`
 * - ❌ Does not work with `Proxy` (if needed, see {@link ProtoCallable})
 *
 * @example
 *
 * ```ts
 * const a = EmptyArrowCallable((n: number) => 2 * n)
 *
 * expect(a(2)).toBe(4)
 * ```
 *
 * @param func - Call implementation
 */
export function EmptyArrowCallable<
	Func extends Callable<{ this: void }> = Callable<{ this: void }>,
>(func: Func): EmptyArrowCallable<Func> {
	const callableObject = func.bind(null as never)

	// clean up own properties of the function object (name, length, caller, callee, arguments, prototype, ...)
	// ! * deleting symbols should generally not be needed... just for forward-compatibility, just in case
	// ! * NOTE: this silently fails under react-native, after Expo upgrade (new Hermes engine version?)
	tryDeleteAllProperties(callableObject)

	// $expect(Object.getOwnPropertyDescriptors(callableObject)).toStrictEqual({})

	$fastAssert(
		Object.getOwnPropertyDescriptor(callableObject, 'prototype')
			?.configurable !== false,
		"do not transpile to `function(){}` - don't want to include non-configurable `prototype` property",
	)

	return callableObject as never
}

export type EmptyArrowCallable<
	Func extends Callable<{ this: void }> = Callable<{ this: void }>,
> = ArrowCallable<Func>
