// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Callable } from '../callable'
import type { Newable } from '../newable'
import type { CallableParameters_ } from './CallableParameters'
import type { NewableParameters_ } from './NewableParameters'

export type Parameters_<T> = [T] extends [Callable]
	? CallableParameters_<T>
	: [T] extends [Newable]
		? NewableParameters_<T>
		: never

export type Parameters<T extends Callable | Newable> = Parameters_<T>

//

export type $Parameters_<T> = T extends any ? Parameters_<T> : never

export type $Parameters<T extends Callable | Newable> = $Parameters_<T>
