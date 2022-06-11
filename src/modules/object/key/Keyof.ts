export type Keyof_<Obj> = {
	[k in keyof Obj]: Obj[k] extends never ? never : k
}[keyof Obj]

export type Keyof<Obj extends object> = Keyof_<Obj>
