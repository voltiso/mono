import type { AlsoAccept } from "@voltiso/util.type";
import type { Value } from "../key-value";

export type OmitByValue<
	Obj extends object,
	Val extends Value<Obj> | AlsoAccept<unknown>
> = Omit<
	Obj,
	{
		[k in keyof Obj]: Value<Obj, k> extends Val ? k : never;
	}[keyof Obj]
>;
