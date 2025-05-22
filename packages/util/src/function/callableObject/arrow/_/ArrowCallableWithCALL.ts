// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { UNSET } from '_/symbols/unset'
import type { CALL, WithCALL } from '~/function'

/** @internal Use `CallableWithCall` instead */
export type IArrowCallableWithCALL = WithCALL & WithCALL[CALL]

/** @internal Use `CallableWithCall` instead */
export type _ArrowCallableWithCALL<T extends WithCALL> = T &
	T[CALL] &
	Record<Exclude<keyof CallableFunction, keyof T>, never>

//

export type ArrowCallableWithCALL<T extends WithCALL | UNSET = UNSET> =
	T extends UNSET
		? IArrowCallableWithCALL
		: T extends WithCALL
			? _ArrowCallableWithCALL<T>
			: never
