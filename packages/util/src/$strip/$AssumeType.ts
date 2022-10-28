// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable etc/no-misused-generics */

/**
 * Manually force-narrow type of `x`
 * https://github.com/microsoft/TypeScript/issues/10421#issuecomment-518806979
 *
 * @example
 *
 * ```ts
 * const x = ...
 * assumeType<string>(x) // now `x` is `string`!
 * ```
 *
 * @example
 *
 * ```ts
 * const x = ...
 * assumeType<string, typeof x>(x) // narrow-only
 * ```
 *
 * @param _x - Variable to narrow type of
 * @strip Use `@voltiso/transform/strip` to strip from production code
 */
export function $AssumeType<T extends Supertype, Supertype = unknown>(
	_x: Supertype,
): asserts _x is T {}
