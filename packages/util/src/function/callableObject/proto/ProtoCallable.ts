// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { clone } from '~/clone'
import { deleteAllProperties } from '~/object'
import type { NoArgument } from '~/type'

import type { _ProtoCallable, IProtoCallable } from './_'
import type { ProtoCallableOptions } from './_/ProtoCallableOptions'

export type __unused_ProtoCallable = typeof clone

//

export type ProtoCallable<
	Options extends ProtoCallableOptions | NoArgument = NoArgument,
> = Options extends NoArgument
	? // eslint-disable-next-line etc/no-internal
		IProtoCallable
	: Options extends ProtoCallableOptions
		? // eslint-disable-next-line etc/no-internal
			_ProtoCallable<Options>
		: never

//

/**
 * Create callable anything
 *
 * - ✅ Works with {@link Proxy} - see tests
 * - ❌ Does not allow `this`
 * - ❌ Can't enumerate properties
 *
 *   - Works by changing function's prototype
 * - ❌ Does not work properly with {@link clone}()
 *
 * @example
 *
 * ```ts
 * const a = ProtoCallable({
 * 	call: (n: number) => 2 * n,
 * 	prototype: { a: 1 },
 * })
 *
 * expect(a.a).toBe(1)
 * expect(a(2)).toBe(4)
 * ```
 */
export function ProtoCallable<Options extends ProtoCallableOptions>(
	options: Options,
): ProtoCallable<Options> {
	const callable = options.call.bind(null as never)
	deleteAllProperties(callable)

	Object.setPrototypeOf(callable, options.prototype as never)
	return callable as never
}
