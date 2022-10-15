// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $Decrement, DecrementArgument } from '~/type'

/** @inline */
export type DeepMutable_<T> = {
	-readonly [k in keyof T]: DeepMutable_<T[k]>
}

/** @inline */
export type DeepMutable<T extends object | unknown[]> = DeepMutable_<T>

//

/** @inline */
export type $DeepMutable_<T> = T extends any ? DeepMutable_<T> : never

/** @inline */
export type $DeepMutable<T extends object | unknown[]> = $DeepMutable_<T>

//

//

export type DeepMutableX_<
	T,
	TLength extends DecrementArgument,
> = TLength extends 0
	? T
	: $Decrement<TLength> extends DecrementArgument
	? {
			-readonly [k in keyof T]: DeepMutableX_<T[k], $Decrement<TLength>>
	  }
	: never
