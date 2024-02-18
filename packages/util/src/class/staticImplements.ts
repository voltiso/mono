// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable no-empty-function */

/**
 * Decorator for classes to type-check static fields
 *
 * - https://stackoverflow.com/a/43674389/1123898
 *
 * @example
 *
 * ```ts
 * @staticImplements<IMyConstructor>()
 * class MyConstructor {
 *   ...
 * }
 * ```
 *
 * @returns Decorator
 */
export function staticImplements<Constructor>() {
	return <C extends Constructor>(_: C) => {}
}
