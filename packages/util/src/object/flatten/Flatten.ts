// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/no-magic-numbers */

/**
 * Flatten (1-level-deep)
 *
 * @inline
 */
export type _<T> = [{ [k in keyof T]: T[k] }][0]

/**
 * Flatten (2-level-deep)
 *
 * @inline
 */
export type __<T> = { [k in keyof T]: _<T[k]> }

/**
 * Flatten (3-level-deep)
 *
 * @inline
 */
export type ___<T> = { [k in keyof T]: __<T[k]> }
