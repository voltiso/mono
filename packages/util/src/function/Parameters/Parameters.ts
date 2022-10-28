// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	Callable,
	CallableParameters_,
	Newable,
	NewableParameters_,
} from '~'

export type Parameters_<T> = [T] extends [Callable]
	? CallableParameters_<T>
	: [T] extends [Newable]
	? NewableParameters_<T>
	: never

export type Parameters<T extends Callable | Newable> = Parameters_<T>

//

export type $Parameters_<T> = T extends any ? Parameters_<T> : never

export type $Parameters<T extends Callable | Newable> = $Parameters_<T>
