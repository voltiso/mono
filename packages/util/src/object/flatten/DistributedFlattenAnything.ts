// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { _, __, Callable, Newable } from '~'

/**
 * DistributedFlattenAnything
 *
 * @inline
 */
export type $$_<T> = T extends Callable | Newable
	? T
	: T extends object
	? _<T>
	: T

/**
 * DistributedFlattenAnything2
 *
 * @inline
 */
export type $$__<T> = T extends Callable | Newable
	? T
	: T extends object
	? __<T>
	: T
