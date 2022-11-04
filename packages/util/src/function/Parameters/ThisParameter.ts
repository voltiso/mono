// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Callable } from '../callable'

export type ThisParameter_<T> = [T] extends [
	(this: infer This, ...args: any) => any,
]
	? This
	: never

export type ThisParameter<T extends Callable> = ThisParameter_<T>

export type $ThisParameter_<T> = T extends any ? ThisParameter_<T> : never

export type $ThisParameter<T extends Callable> = $ThisParameter_<T>
