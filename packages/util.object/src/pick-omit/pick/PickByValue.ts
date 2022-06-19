import { AlsoAccept } from '../../../misc/AlsoAccept'
import { Value } from '../../key-value'

export type PickByValue<
	Obj extends object,
	Val extends Value<Obj> | AlsoAccept<unknown>
> = Pick<
	Obj,
	{
		[k in keyof Obj]: Value<Obj, k> extends Val ? k : never
	}[keyof Obj]
>
