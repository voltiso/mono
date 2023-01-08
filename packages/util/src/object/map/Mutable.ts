// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export type Mutable_<Obj> = {
	-readonly [key in keyof Obj]: Obj[key]
}

export type Mutable<Obj extends object> = Mutable_<Obj>

export type $Mutable_<Obj> = Obj extends any ? Mutable_<Obj> : never

export type $Mutable<Obj extends object> = $Mutable_<Obj>
