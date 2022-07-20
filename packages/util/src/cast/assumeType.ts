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
 * @param _x - Variable to narrow type of
 */
export function assumeType<T>(_x: unknown): asserts _x is T {}
