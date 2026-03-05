// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/** @inline */
export type DeepPartial_<T> = [
	{
		[k in keyof T]?: DeepPartial_<T[k]>
	},
][0]

export type _ObjectLike = {
	OPTIONS: { shape: any; Output: any; Input: any }
}

export type _GetDeepPartial_<This> = This extends _ObjectLike
	? {
			Output: DeepPartial_<This['OPTIONS']['Output']>
		}
	: never
