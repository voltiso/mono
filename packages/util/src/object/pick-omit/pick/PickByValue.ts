// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Value } from '~/object'
import type { AlsoAccept } from '~/type'

export type PickByValue<
	Obj extends object,
	Value_ extends Value<Obj> | AlsoAccept<unknown>,
> = Pick<
	Obj,
	{
		[k in keyof Obj]: Value<Obj, k> extends Value_ ? k : never
	}[keyof Obj]
>
