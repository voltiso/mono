// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { CanBeUndefinedImpl, IsOptionalImpl } from '~/object'
import type { AlsoAccept } from '~/type'

export type Value<
	Obj extends object,
	Key extends keyof Obj | AlsoAccept<keyof any> = keyof Obj,
> = ValueImpl<Obj, Key>

export type Value_<Obj, Key = keyof Obj> = Obj extends object
	? Key extends keyof Obj
		? ValueImpl<Obj, Key>
		: never
	: never

//

export type ValueImpl<
	Obj,
	Key extends keyof any = keyof Obj,
> = Obj extends object
	? Key extends keyof Obj
		? IsOptionalImpl<Obj, Key> extends true
			? CanBeUndefinedImpl<Obj, Key> extends true
				? Obj[Key]
				: Exclude<Obj[Key], undefined>
			: Obj[Key]
		: never
	: never
