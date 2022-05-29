export type CanBeUndefined<
	Obj,
	key extends keyof Obj,
	True = true,
	False = false
> = Obj extends unknown
	? {
			[k in key]: undefined
	  } extends {
			[k in key]: Obj[k]
	  }
		? True
		: False
	: never
