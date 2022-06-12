import { IsOptional } from '../../IsOptional'

export type OmitOptional<Obj extends object> = Omit<
	Obj,
	{
		[key in keyof Obj]: IsOptional<Obj, key> extends true ? key : never
	}[keyof Obj]
>
