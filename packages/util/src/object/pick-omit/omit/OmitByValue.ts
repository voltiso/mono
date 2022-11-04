// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Value_ } from '~/object'
import type { AlsoAccept } from '~/type'

export type OmitByValue<
	Obj extends object,
	Value extends Value_<Obj> | AlsoAccept<unknown>,
> = OmitByValue_<Obj, Value>

export type OmitByValue_<Obj, Value> = Omit<
	Obj,
	{
		[k in keyof Obj]: Value_<Obj, k> extends Value ? k : never
	}[keyof Obj]
>
