// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/**
 * Fixes the problem with TypeScript not inferring templated call correctly,
 * even with `strictBindCallApply: true`
 *
 * @example
 *
 * ```ts
 * const result = apply(func, ths, args) // same as `func.apply(ths, args)`
 * ```
 *
 * @param func - Function to call
 * @param thisArg - `this` argument to call `func` with
 * @param args - Arguments to call `func` with
 * @returns The value that `func` returned
 */
export function apply<ThisArg, Args extends unknown[], R>(
	func: (this: ThisArg, ...args: Args) => R,
	thisArg: ThisArg,
	args: Args,
): R {
	return func.apply(thisArg, args)
}
