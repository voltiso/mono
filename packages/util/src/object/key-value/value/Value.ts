// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $Keyof, CanBeUndefined, IsOptional } from '~/object'
import type { exactOptionalPropertyTypes } from '~/tsc-options'
import type { AlsoAccept } from '~/type'

/** Distributes over `$obj` and `$key` */
export type Value<
	$obj,
	$key extends $Keyof<$obj> | AlsoAccept<unknown> = $Keyof<$obj>,
> = $obj extends any
	? $key extends $Keyof<$obj>
		? IsOptional<$obj, $key> extends true
			? exactOptionalPropertyTypes extends false
				? Exclude<$obj[$key], undefined> // ! design choice... unable to determine, so return cleaner result without `undefined`
				: CanBeUndefined<$obj, $key> extends true
					? $obj[$key]
					: Exclude<$obj[$key], undefined>
			: $obj[$key]
		: never
	: never
