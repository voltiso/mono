// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export type Get_<
	Obj,
	Property,
	Supertype = unknown,
> = Property extends keyof Obj
	? Obj[Property] extends Supertype
		? Obj[Property]
		: never
	: never
