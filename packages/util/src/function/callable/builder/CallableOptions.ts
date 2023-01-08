// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { NoThis } from '~/function'
import type { Override } from '~/type'

export interface CallableNoThisOptions {
	parameters: readonly unknown[]
	return: unknown
}

export interface CallableOptions extends CallableNoThisOptions {
	this: unknown | NoThis
}

export interface DefaultCallableOptions extends CallableOptions {
	this: NoThis
	parameters: any // ! good enough without bivariance hack
	return: void
}

// $Assert.is<void, unknown>()
// $Assert.is<unknown, void>()

//

export type GetCallableOptions<O extends Partial<CallableOptions>> = Override<
	DefaultCallableOptions,
	O
>
