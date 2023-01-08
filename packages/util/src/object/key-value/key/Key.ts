// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Value } from '~/object'
import type { AlsoAccept } from '~/type'

export type Key<
	O extends object,
	V extends Value<O> | AlsoAccept<unknown> = unknown,
> = Key_<O, V>

export type Key_<O, V> = Value<{
	[k in keyof O as O[k] extends V ? k : never]: k
}>
