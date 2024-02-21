// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/**
 * Manually force-narrow type of `x`
 * https://github.com/microsoft/TypeScript/issues/10421#issuecomment-518806979
 *
 * @example
 *
 * ```ts
 * const x = ... as 'test' | number
 * $AssumeType<string>(x) // now `x` is 'test'
 * ```
 *
 * @example
 *
 * ```ts
 * const x = ... as string | number
 * $AssumeType<'test', string>(x) // error!
 * ```
 *
 * @param _x - Variable to narrow type of
 * @strip Use `@voltiso/transform/strip` to strip from production code
 */
export function $AssumeType<T extends Supertype, Supertype = unknown>(
	_x: Supertype,
	// eslint-disable-next-line no-empty-function, @typescript-eslint/no-empty-function
): asserts _x is T {}

//

// /**
//  * @example
//  *
//  * ```ts
//  * const x = ... // string | number
//  * $AssumeTypeIf<'test', string>()(x) // now `x` is 'test' | number
//  * ```
//  */
// export const $AssumeTypeIf = <T extends Supertype, Supertype = unknown>() => ({
// 	value: <_Inferred>(
// 		_x: _Inferred,
// 	): asserts _x is _Inferred extends Supertype
// 		? _Inferred & T
// 		: _Inferred => {},
// })

// //

// $dev(() => {
// 	const x = 0 as unknown as string | number
// 	$AssumeTypeIf<'test', string>().value(x) // now `x` is 'test' | number
// })
