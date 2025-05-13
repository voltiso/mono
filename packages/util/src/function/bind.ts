// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/**
 * Fixes the problem with TypeScript not inferring templated call correctly,
 * even with strictBindCallApply=true
 *
 * @example
 *
 * ```ts
 * const g = bind(f, ths) // same as `f.bind(ths)`
 * ```
 *
 * @param func - A function to bind `this` argument for
 * @param thisArg - `this` argument to call `func` with
 * @returns `func` bound to `this = thisArg`
 */
export function bind<ThisArg, Args extends unknown[], R>(
	func: (this: ThisArg, ...args: Args) => R,
	thisArg: ThisParameterType<(this: ThisArg, ...args: Args) => R>,
): OmitThisParameter<(this: ThisArg, ...args: Args) => R> {
	return func.bind(thisArg)
}
