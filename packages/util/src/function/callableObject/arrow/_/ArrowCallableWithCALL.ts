// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { CALL, WithCALL } from '~/function'
import type { NoArgument } from '~/type'

/** @internal Use `CallableWithCall` instead */
// eslint-disable-next-line etc/underscore-internal
export type IArrowCallableWithCALL = WithCALL & WithCALL[CALL]

/** @internal Use `CallableWithCall` instead */
export type _ArrowCallableWithCALL<T extends WithCALL> = T &
	T[CALL] &
	Record<Exclude<keyof CallableFunction, keyof T>, never>

//

export type ArrowCallableWithCALL<
	T extends WithCALL | NoArgument = NoArgument,
> = T extends NoArgument
	? // eslint-disable-next-line etc/no-internal
	  IArrowCallableWithCALL
	: T extends WithCALL
	? // eslint-disable-next-line etc/no-internal
	  _ArrowCallableWithCALL<T>
	: never
