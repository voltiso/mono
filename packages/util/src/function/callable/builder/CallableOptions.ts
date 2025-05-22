// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { UNSET } from '_/symbols/unset'
import type { Override } from '~/type'

export interface CallableNoThisOptions {
	parameters: readonly unknown[]
	return: unknown
}

export interface CallableOptions extends CallableNoThisOptions {
	this: unknown | UNSET
}

export interface DefaultCallableOptions extends CallableOptions {
	this: UNSET
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
