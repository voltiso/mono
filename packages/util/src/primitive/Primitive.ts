// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/** Anything but `object` or `function` */
export type Primitive =
	| null
	| undefined
	| string
	| number
	| boolean
	| symbol
	| bigint

/**
 * Is `x` a `Primitive`?
 *
 * - `Primitive` is anything but object or function
 *
 * @example
 *
 * ```ts
 * const b = isPrimitive(123) // `true`
 * ```
 *
 * @param x - Value to be checked if it's a `Primitive`
 * @returns `true` if `x` is `Primitive`
 */
export function isPrimitive(x: unknown): x is Primitive {
	return (typeof x !== 'object' && typeof x !== 'function') || x === null
}
