// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Callable } from '~'

export type CallableReturn_<T> = [T] extends [(...args: any) => infer Return]
	? Return
	: never

export type CallableReturn<T extends Callable> = CallableReturn_<T>

export type $CallableReturn_<T> = T extends any
	? CallableReturn_<T>
	: never

export type $CallableReturn<T extends Callable> = $CallableReturn_<T>
