// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Newable } from '../newable'

export type NewableParameters_<T> = [T] extends [
	abstract new (...args: infer Args) => any,
]
	? Args
	: never

export type NewableParameters<T extends Newable> = NewableParameters_<T>

export type $NewableParameters_<T> = T extends any
	? NewableParameters_<T>
	: never

export type $NewableParameters<T extends Newable> = $NewableParameters_<T>
