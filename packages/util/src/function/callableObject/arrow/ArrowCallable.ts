// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ArrowCallableWithCALL, Callable, ProtoCallable } from '~/function'
import type { NoArgument } from '~/type'

import type { WithCALL } from '../CALL'
import { CALL, isWithCALL } from '../CALL'
import type { _ArrowCallable, IArrowCallable } from './_/ArrowCallableType'
import type { ArrowCallableOptions } from './ArrowCallableOptions'
import { EmptyArrowCallable } from './EmptyArrowCallable'

//

export type ArrowCallable<
	Options extends
		| ArrowCallableOptions
		| WithCALL
		| Callable<{ this: void }>
		| NoArgument = NoArgument,
> = Options extends NoArgument
	? // eslint-disable-next-line etc/no-internal
	  IArrowCallable
	: Options extends ArrowCallableOptions
	? // eslint-disable-next-line etc/no-internal
	  _ArrowCallable<Options>
	: Options extends WithCALL
	? ArrowCallableWithCALL<Options>
	: Options extends Callable<{ this: void }>
	? // eslint-disable-next-line etc/no-internal
	  _ArrowCallable<{ call: Options }>
	: never

//

export type __unused_ArrowCallable = ProtoCallable

/**
 * Create a function with no own properties
 *
 * - ✅ Works with `clone`
 * - ❌ Does not allow `this` (hence "ArrowCallable")
 * - ❌ Does not work with `Proxy` (if needed, @see {@link ProtoCallable})
 *
 * @example
 *
 * ```ts
 * const a = ArrowCallable({ a: 1, [CALL]: (n: number) => 2 * n })
 *
 * expect(a.a).toBe(1)
 * expect(a(2)).toBe(4)
 * ```
 *
 * @param shape - An object to shallow-copy properties and `__proto__` from;
 *   also, `shape[CALL]` property will be used as the call function
 */
export function ArrowCallable<O extends WithCALL>(shape: O): ArrowCallable<O>

/**
 * Create a function with no own properties
 *
 * - ✅ Works with `clone`
 * - ❌ Does not allow `this` (hence "ArrowCallable")
 * - ❌ Does not work with `Proxy` (if needed, @see {@link ProtoCallable})
 *
 * @example
 *
 * ```ts
 * const a = ArrowCallable((n: number) => 2 * n, { a: 1 })
 *
 * expect(a.a).toBe(1)
 * expect(a(2)).toBe(4)
 * ```
 *
 * @param options - @see `ArrowCallableOptions`
 */
export function ArrowCallable<Options extends ArrowCallableOptions>(
	options: Options,
): ArrowCallable<Options>

/** Aggregate overload - check previous overloads for documentation */
export function ArrowCallable<Options extends ArrowCallableOptions | WithCALL>(
	options: Options,
): ArrowCallable<Options>

//

export function ArrowCallable<Options extends ArrowCallableOptions | WithCALL>(
	options: Options,
): ArrowCallable<Options> {
	// eslint-disable-next-line security/detect-object-injection
	const call = isWithCALL(options) ? options[CALL] : options.call

	const callableObject = EmptyArrowCallable(call)

	const shape = isWithCALL(options) ? options : options.shape

	if (shape) {
		Object.defineProperties(
			callableObject,
			Object.getOwnPropertyDescriptors(shape),
		)

		Object.setPrototypeOf(callableObject, Object.getPrototypeOf(shape) as never)
	}

	return callableObject as never
}
