// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Callable } from '../callable'
import type { AbstractNewable, Newable } from '../newable'

/** Similar to the standard `ReturnType` and `InstanceType` */
export type Return_<T> = [T] extends [(...args: any) => infer R]
	? R
	: [T] extends [abstract new (...args: any) => infer R]
	? R
	: never

/** Similar to the standard `ReturnType` and `InstanceType` */
export type Return<T extends Callable | Newable | AbstractNewable> = Return_<T>

//

/** Similar to the standard `ReturnType` and `InstanceType` */
export type $Return_<T> = T extends any ? Return_<T> : never

/** Similar to the standard `ReturnType` and `InstanceType` */
export type $Return<T extends Callable | Newable | AbstractNewable> =
	$Return_<T>
