// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/no-magic-numbers */

export type Falsy = null | undefined | 0 | 0n | false | void | ''

// export type IsFalsy<A, T = true, F = false> = A extends Falsy
// 	? T
// 	: A & Falsy extends never
// 	? F
// 	: T | F

// export type IsTruthy<A, T = true, F = false> = IsFalsy<A, F, T>
