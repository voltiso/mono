// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $Decrement, DecrementArgument, IsCompatible, NotProvided } from '~/type'

/** @inline */
export type DeepMutable_<T> = {
	-readonly [k in keyof T]: DeepMutable_<T[k]>
}

/** @inline */
export type DeepMutable<T extends object | unknown[]> = DeepMutable_<T>

//

/** @inline */
export type $DeepMutable_<T> = T extends any ? DeepMutable_<T> : never

/** @inline */
export type $DeepMutable<T extends object | unknown[]> = $DeepMutable_<T>

//

//

/**
 * Deep-mutable with depth-limit
 *
 * - Useful, because TS does not expand infinite recursive types in VSCode
 * - Non-distributive version
 */
export type DeepMutableN<
	TLength extends DecrementArgument,
	T,
	Options extends { skip: unknown } = { skip: NotProvided },
> = TLength extends 0
	? T
	: $Decrement<TLength> extends DecrementArgument
	? [T] extends [object]
		? // eslint-disable-next-line etc/no-internal
		  DeepMutableN._ShouldSkip<T, Options['skip']> extends true
			? T
			: {
					-readonly [k in keyof T]: DeepMutableN<
						$Decrement<TLength>,
						T[k],
						Options
					>
			  }
		: T
	: never

/**
 * Deep-mutable with depth-limit
 *
 * - Useful, because TS does not expand infinite recursive types in VSCode
 * - Shallow-distributive version `$`
 */
export type $DeepMutableN<
	TLength extends DecrementArgument,
	T,
	Options extends { skip: unknown } = { skip: NotProvided },
> = T extends any ? DeepMutableN<TLength, T, Options> : never

/**
 * Deep-mutable with depth-limit
 *
 * - Useful, because TS does not expand infinite recursive types in VSCode
 * - Deeply-distributive version `$$`
 */
export type $$DeepMutableN<
	TLength extends DecrementArgument,
	T,
	Options extends { skip: unknown } = { skip: NotProvided },
> = TLength extends 0
	? T
	: $Decrement<TLength> extends DecrementArgument
	? T extends object
		? // eslint-disable-next-line etc/no-internal
		  DeepMutableN._ShouldSkip<T, Options['skip']> extends true
			? T
			: {
					-readonly [k in keyof T]: $$DeepMutableN<
						$Decrement<TLength>,
						T[k],
						Options
					>
			  }
		: T
	: never

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace DeepMutableN {
	/** @internal */
	export type _ShouldSkip<T, skipOption> = IsCompatible<
		skipOption,
		NotProvided
	> extends true
		? false
		: [T] extends [skipOption]
		? true
		: false
}
