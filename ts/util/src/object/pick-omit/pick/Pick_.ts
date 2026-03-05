// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/**
 * Same as built-in Pick, but:
 *
 * - No template argument constraint on K
 * - Tries to simplify the type rather than keeping it opaque
 */
export type Pick_<T, K> = [Pick.Get<T, K & keyof T>][0]

export declare namespace Pick {
	export type Get<T, K extends keyof T> = [
		{
			[P in K]: T[P]
		},
	][0]
}

export type $Pick_<O, K> = O extends any
	? [K] extends [keyof any]
		? { [k in K]: k extends keyof O ? O[k] : never }
		: never
	: never

export type $Pick<O extends {}, K extends keyof O> = O extends any
	? Pick<O, K>
	: never
