// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export type MapOr<Obj extends object, X> = {
	[key in keyof Obj]: Obj[key] | X
}

export type MapOrUndefined<Obj extends object> = MapOr<Obj, undefined>
export type MapOrNull<Obj extends object> = MapOr<Obj, null>
