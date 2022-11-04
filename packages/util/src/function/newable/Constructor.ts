// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Override } from '~/type'

import type { Newable, NewableOptions } from './builder'

//

export interface Constructor<O extends Partial<ConstructorOptions> = {}>
	extends Newable<GetConstructorOptions<O>> {
	prototype: GetConstructorOptions<O>['return']
}

//

//

export interface ConstructorOptions extends NewableOptions {
	/** Return type (instance type) */
	return: object
}

export interface DefaultConstructorOptions extends ConstructorOptions {
	parameters: any
}

//

export type GetConstructorOptions<O extends Partial<ConstructorOptions>> =
	Override<DefaultConstructorOptions, O>
