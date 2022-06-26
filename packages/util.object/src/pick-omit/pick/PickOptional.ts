import { IsOptional } from "../../IsOptional.js";

export type PickOptional<Obj extends object> = Pick<
	Obj,
	{
		[key in keyof Obj]: IsOptional<Obj, key> extends true ? key : never;
	}[keyof Obj]
>;
