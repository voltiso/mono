// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export type DeepPartialOrUndefined_<T> = {
	[k in keyof T]?: DeepPartialOrUndefined_<T[k]> | undefined
}

export type DeepPartialOrUndefined<T extends object> =
	DeepPartialOrUndefined_<T>

//

export type $DeepPartialOrUndefined_<T> = T extends any
	? DeepPartialOrUndefined_<T>
	: never

export type $DeepPartialOrUndefined<T extends object> =
	$DeepPartialOrUndefined_<T>
