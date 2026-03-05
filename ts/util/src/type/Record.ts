// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export type Record_<K, V> = [K] extends [keyof any]
	? Record<K & keyof any, V>
	: never

//

export type PlainObjectRecord<K extends keyof any, V> = object & {
	[k in K]: V
}

export type PlainObjectRecord_<K, V> = [K] extends [keyof any]
	? PlainObjectRecord<K, V>
	: never
