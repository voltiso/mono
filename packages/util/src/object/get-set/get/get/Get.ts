export type Get_<
	Object,
	Property,
	Supertype = unknown,
> = Property extends keyof Object
	? Object[Property] extends Supertype
		? Object[Property]
		: never
	: never
