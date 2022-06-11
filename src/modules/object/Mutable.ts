export type Mutable<Obj extends object> = {
	-readonly [key in keyof Obj]: Obj[key]
}
