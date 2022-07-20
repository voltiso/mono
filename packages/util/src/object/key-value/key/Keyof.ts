// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export type Keyof_<Obj> = {
	[k in keyof Obj]: Obj[k] extends never ? never : k
}[keyof Obj]

export type Keyof<Obj extends object> = Keyof_<Obj>
