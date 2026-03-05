// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { UNSET } from '_/symbols/unset'

import type { $Decrement, DecrementArgument, IsCompatible } from '~/type'

/** @inline */
export type DeepReadonly_<T> = T extends object
	? {
			readonly [k in keyof T]: DeepReadonly_<T[k]>
		}
	: T

/** @inline */
export type DeepReadonly<T extends object> = DeepReadonly_<T>

//

/** @inline */
export type $DeepReadonly_<T> = T extends any ? DeepReadonly_<T> : never

/** @inline */
export type $DeepReadonly<T extends object> = $DeepReadonly_<T>

//

//

/**
 * Deep-readonly with depth-limit
 *
 * - Useful, because TS does not expand infinite recursive types in VSCode
 * - Non-distributive version
 */
export type DeepReadonlyN<
	TLength extends DecrementArgument,
	T,
	Options extends { skip: unknown } = { skip: UNSET },
> = TLength extends 0
	? T
	: $Decrement<TLength> extends DecrementArgument
		? DeepReadonlyN._ShouldSkip<T, Options['skip']> extends true
			? T
			: T extends object
				? {
						readonly [k in keyof T]: DeepReadonlyN<
							$Decrement<TLength>,
							T[k],
							Options
						>
					}
				: T
		: T

/**
 * Deep-readonly with depth-limit
 *
 * - Useful, because TS does not expand infinite recursive types in VSCode
 * - Shallow-distributive version `$`
 */
export type $DeepReadonlyN<
	TLength extends DecrementArgument,
	T,
	Options extends { skip: unknown } = { skip: UNSET },
> = T extends any ? DeepReadonlyN<TLength, T, Options> : never

/**
 * Deep-readonly with depth-limit
 *
 * - Useful, because TS does not expand infinite recursive types in VSCode
 * - Deeply-distributive version `$$`
 */
export type $$DeepReadonlyN<
	TLength extends DecrementArgument,
	T,
	Options extends { skip: unknown } = { skip: UNSET },
> = TLength extends 0
	? T
	: $Decrement<TLength> extends DecrementArgument
		? DeepReadonlyN._ShouldSkip<T, Options['skip']> extends true
			? T
			: {
					readonly [k in keyof T]: $$DeepReadonlyN<
						$Decrement<TLength>,
						T[k],
						Options
					>
				}
		: T

// export type $DeepReadonlyN<TLength extends DecrementArgument, T, Options extends >

export namespace DeepReadonlyN {
	/** @internal */
	export type _ShouldSkip<T, skipOption> =
		IsCompatible<skipOption, UNSET> extends true
			? false
			: [T] extends [skipOption]
				? true
				: false
}
