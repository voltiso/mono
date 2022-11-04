// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { GetNewableOptions, NewableOptions } from './NewableOptions'

/**
 * - Parameters default to `any` (so that bivariance hack is not required)
 * - See `Bivariant` to make the result bivariant
 * - Use `AbstractNewable` if true newable super-type is needed
 */
export type Newable<O extends Partial<NewableOptions> = {}> = new (
	...args: GetNewableOptions<O>['parameters']
) => GetNewableOptions<O>['return']

//

/**
 * - Parameters default to `any` (so that bivariance hack is not required)
 * - See `Bivariant` to make the result bivariant
 * - Use `Newable` to get a non-abstract newable (which is a sub-type)
 */
export type AbstractNewable<O extends Partial<NewableOptions> = {}> =
	abstract new (
		...args: GetNewableOptions<O>['parameters']
	) => GetNewableOptions<O>['return']
