// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { AlsoAccept } from '~/type'

import type { Value } from '../key-value'

export type OmitByValue<
	Obj extends object,
	Value_ extends Value<Obj> | AlsoAccept<unknown>,
> = Omit<
	Obj,
	{
		[k in keyof Obj]: Value<Obj, k> extends Value_ ? k : never
	}[keyof Obj]
>
