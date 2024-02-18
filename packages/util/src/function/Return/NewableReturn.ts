// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Newable } from '../newable'

export type NewableReturn_<T> = [T] extends [
	abstract new (...args: any) => infer Return,
]
	? Return
	: never

export type NewableReturn<T extends Newable> = NewableReturn_<T>

export type $NewableReturn_<T> = T extends any ? NewableReturn_<T> : never

export type $NewableReturn<T extends Newable> = $NewableReturn_<T>
