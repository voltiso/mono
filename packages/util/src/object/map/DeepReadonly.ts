// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	$Decrement,
	DecrementArgument,
	IsCompatible,
	NoArgument,
} from '~/type'

/** @inline */
export type DeepReadonly_<T> = {
	readonly [k in keyof T]: DeepReadonly_<T[k]>
}

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
	Options extends { skip: unknown } = { skip: NoArgument },
> = TLength extends 0
	? T
	: $Decrement<TLength> extends DecrementArgument
	? [T] extends [object]
		? // eslint-disable-next-line etc/no-internal
		  DeepReadonlyN._ShouldSkip<T, Options['skip']> extends true
			? T
			: {
					readonly [k in keyof T]: DeepReadonlyN<
						$Decrement<TLength>,
						T[k],
						Options
					>
			  }
		: T
	: never

/**
 * Deep-readonly with depth-limit
 *
 * - Useful, because TS does not expand infinite recursive types in VSCode
 * - Shallow-distributive version `$`
 */
export type $DeepReadonlyN<
	TLength extends DecrementArgument,
	T,
	Options extends { skip: unknown } = { skip: NoArgument },
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
	Options extends { skip: unknown } = { skip: NoArgument },
> = TLength extends 0
	? T
	: $Decrement<TLength> extends DecrementArgument
	? T extends object
		? // eslint-disable-next-line etc/no-internal
		  DeepReadonlyN._ShouldSkip<T, Options['skip']> extends true
			? T
			: {
					readonly [k in keyof T]: $$DeepReadonlyN<
						$Decrement<TLength>,
						T[k],
						Options
					>
			  }
		: T
	: never

// export type $DeepReadonlyN<TLength extends DecrementArgument, T, Options extends >

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace DeepReadonlyN {
	/** @internal */
	export type _ShouldSkip<T, skipOption> = IsCompatible<
		skipOption,
		NoArgument
	> extends true
		? false
		: [T] extends [skipOption]
		? true
		: false
}
