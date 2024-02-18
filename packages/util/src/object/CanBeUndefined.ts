// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { exactOptionalPropertyTypes } from '..'

/** Distributes over `$obj` */
export type CanBeUndefined<
	$obj,
	key extends keyof $obj,
	True = true,
	False = false,
> = exactOptionalPropertyTypes extends false
	? boolean // ! cannot determine without this tsc option
	: $obj extends any
		? key extends any
			? {
					[k in key]: undefined
				} extends {
					[k in key]: $obj[k]
				}
				? True
				: False
			: never
		: never

/** ⚠️ Prefer {@link CanBeUndefined} - should be faster */
export type CanBeUndefined_<
	$obj,
	key,
	True = false,
	False = false,
> = CanBeUndefined<$obj, key & keyof $obj, True, False>
