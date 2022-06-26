import { IsOptional } from "../../IsOptional.js";

export type OmitRequired<Obj extends object> = Omit<
	Obj,
	{
		[key in keyof Obj]: IsOptional<Obj, key> extends false ? key : never;
	}[keyof Obj]
>;
