// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { OPTIONS } from '_'

import type { MutableTuple, ReadonlyTuple, Schemable_ } from '~'

export type GetTuple<This, T extends Schemable_[]> = This extends {
	[OPTIONS]: { isReadonlyTuple: boolean }
}
	? This[OPTIONS]['isReadonlyTuple'] extends true
		? ReadonlyTuple<T>
		: This[OPTIONS]['isReadonlyTuple'] extends false
		? MutableTuple<T>
		: never
	: never
