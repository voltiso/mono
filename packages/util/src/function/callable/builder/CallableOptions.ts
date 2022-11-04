// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { NoThis } from '~/function'
import type { Override } from '~/type'

export interface CallableNoThisOptions {
	arguments: readonly unknown[]
	return: unknown
}

export interface CallableOptions extends CallableNoThisOptions {
	this: unknown | NoThis
}

export interface DefaultCallableOptions extends CallableOptions {
	this: NoThis
	arguments: any // ! good enough without bivariance hack
}

//

export type GetCallableOptions<O extends Partial<CallableOptions>> = Override<
	DefaultCallableOptions,
	O
>
