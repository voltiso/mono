// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export type CanBeUndefined<
	Obj extends object,
	Key extends keyof Obj,
	True = true,
	False = false,
> = CanBeUndefinedImpl<Obj, Key, True, False>

export type CanBeUndefined_<
	Obj,
	Key,
	True = false,
	False = false,
> = Key extends keyof Obj ? CanBeUndefinedImpl<Obj, Key, True, False> : never

export type CanBeUndefinedImpl<
	Obj,
	Key extends keyof Obj,
	True = true,
	False = false,
> = Obj extends unknown
	? {
			[k in Key]: undefined
	  } extends {
			[k in Key]: Obj[k]
	  }
		? True
		: False
	: never
