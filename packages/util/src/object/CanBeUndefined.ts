// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { exactOptionalPropertyTypes } from '~/tsc-options'

/** Distributes over `$obj` */
export type CanBeUndefined<
	$obj,
	Key extends keyof $obj,
	True = true,
	False = false,
> = exactOptionalPropertyTypes extends false
	? boolean // ! cannot determine without this tsc option
	: $obj extends any
		? Key extends any
			? {
					[k in Key]: undefined
				} extends {
					[k in Key]: $obj[k]
				}
				? True
				: False
			: never
		: never

/** ⚠️ Prefer {@link CanBeUndefined} - should be faster */
export type CanBeUndefined_<
	$obj,
	Key,
	True = false,
	False = false,
> = CanBeUndefined<$obj, Key & keyof $obj, True, False>
