import { IsOptional } from "../../IsOptional.js";

export type PickRequired<Obj extends object> = Pick<
	Obj,
	{
		[key in keyof Obj]: IsOptional<Obj, key> extends false ? key : never;
	}[keyof Obj]
>;
