// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Callable } from '~'

export type CallableParameters_<T> = [T] extends [(...args: infer Args) => any]
	? Args
	: never

export type CallableParameters<T extends Callable> = CallableParameters_<T>

export type $CallableParameters_<T> = T extends any
	? CallableParameters_<T>
	: never

export type $CallableParameters<T extends Callable> = $CallableParameters_<T>
