/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CanBeUndefinedImpl } from '../../CanBeUndefined'
import { IsOptionalImpl } from '../../IsOptional'
import { AlsoAccept } from '../../../../AlsoAccept'

export type Value<
	Obj extends object,
	Key extends keyof Obj | AlsoAccept<keyof any> = keyof Obj
> = ValueImpl<Obj, Key>

export type Value_<Obj, Key = keyof Obj> = Obj extends object
	? Key extends keyof Obj
		? ValueImpl<Obj, Key>
		: never
	: never

//

export type ValueImpl<
	Obj,
	Key extends keyof any = keyof Obj
> = Obj extends object
	? Key extends keyof Obj
		? IsOptionalImpl<Obj, Key> extends true
			? CanBeUndefinedImpl<Obj, Key> extends true
				? Obj[Key]
				: Exclude<Obj[Key], undefined>
			: Obj[Key]
		: never
	: never
