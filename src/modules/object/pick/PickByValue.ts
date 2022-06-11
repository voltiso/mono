import { AlsoAccept } from '../../../AlsoAccept'
import { Value } from '../value'

export type PickByValue<
	Obj extends object,
	Val extends Value<Obj> | AlsoAccept<unknown>
> = Pick<
	Obj,
	{
		[k in keyof Obj]: Value<Obj, k> extends Val ? k : never
	}[keyof Obj]
>
