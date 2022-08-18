// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/**
 * Non-distributive `DeepPartial` without type constraints
 *
 * @inline
 */
export type DeepPartial_<T> = [
	{
		[k in keyof T]?: DeepPartial_<T[k]>
	},
][0]

/**
 * Non-distributive `DeepPartial` with type constraints
 *
 * @inline
 */
export type DeepPartial<T extends object> = DeepPartial_<T>

//

/**
 * Distributed DeepPartial without type constraints
 *
 * @inline
 */
export type $DeepPartial_<T> = T extends any
	? {
			[k in keyof T]?: DeepPartial_<T[k]>
	  }
	: never

/**
 * Distributed `DeepPartial` with type constraints
 *
 * @inline
 */
export type $DeepPartial<T extends object> = $DeepPartial_<T>
