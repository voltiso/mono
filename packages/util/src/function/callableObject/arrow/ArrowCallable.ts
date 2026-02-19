// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { UNSET } from '_/symbols/unset'

import type { ArrowCallableWithCALL, Callable, ProtoCallable } from '~/function'

import type { WithCALL } from '../CALL'
import { CALL } from '../CALL'
import type { _ArrowCallable, IArrowCallable } from './_/ArrowCallableType'
import type { ArrowCallableOptions } from './ArrowCallableOptions'
import { EmptyArrowCallable } from './EmptyArrowCallable'

//

export type ArrowCallable<
	Options extends
		| ArrowCallableOptions
		| WithCALL
		| Callable<{ this: void }>
		| UNSET = UNSET,
> = Options extends UNSET
	? IArrowCallable
	: Options extends ArrowCallableOptions
		? _ArrowCallable<Options>
		: Options extends WithCALL
			? ArrowCallableWithCALL<Options>
			: Options extends Callable<{ this: void }>
				? _ArrowCallable<{ call: Options }>
				: never

//

export type __unused_ArrowCallable = ProtoCallable

/**
 * Create a function with no own properties
 *
 * - ✅ Works with `clone`
 * - ❌ Does not allow `this` (hence "ArrowCallable")
 * - ❌ Does not work with `Proxy` (if needed, see {@link ProtoCallable})
 *
 * @example
 *
 * ```ts
 * const a = CustomArrowCallable({call: (n: number) => 2 * n, { a: 1 }})
 *
 * expect(a.a).toBe(1)
 * expect(a(2)).toBe(4)
 * ```
 *
 * @param options - See {@link ArrowCallableOptions}
 */
export function CustomArrowCallable<Options extends ArrowCallableOptions>(
	options: Options,
): ArrowCallable<Options> {
	// eslint-disable-next-line @typescript-eslint/strict-void-return
	const callableObject = EmptyArrowCallable(options.call)

	if (options.shape) {
		Object.defineProperties(
			callableObject,
			Object.getOwnPropertyDescriptors(options.shape),
		)

		Object.setPrototypeOf(
			callableObject,
			Object.getPrototypeOf(options.shape) as never,
		)
	}

	return callableObject as never
}

/**
 * Create a function with no own properties
 *
 * - ✅ Works with `clone`
 * - ❌ Does not allow `this` (hence "ArrowCallable")
 * - ❌ Does not work with `Proxy` (if needed, see {@link ProtoCallable})
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
export function ArrowCallable<O extends WithCALL>(shape: O): ArrowCallable<O> {
	return CustomArrowCallable({ shape, call: shape[CALL] }) as never
}
