// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export type FieldName<Obj extends object, Value = unknown> = {
	[k in keyof Obj]: Obj[k] extends Value ? k : never
}[keyof Obj]
