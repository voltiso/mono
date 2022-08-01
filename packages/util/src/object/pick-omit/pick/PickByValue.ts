// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { AlsoAccept, Value } from '~'

export type PickByValue<
	Obj extends object,
	Value_ extends Value<Obj> | AlsoAccept<unknown>,
> = Pick<
	Obj,
	{
		[k in keyof Obj]: Value<Obj, k> extends Value_ ? k : never
	}[keyof Obj]
>
