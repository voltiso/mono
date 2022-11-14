// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Value } from '~/object'
import type { AlsoAccept } from '~/type'

export type OmitByValue<
	Obj extends object,
	val extends Value<Obj> | AlsoAccept<unknown>,
> = OmitByValue_<Obj, val>

export type OmitByValue_<Obj, val> = Omit<
	Obj,
	{
		[k in keyof Obj]: Value<Obj, k> extends val ? k : never
	}[keyof Obj]
>
