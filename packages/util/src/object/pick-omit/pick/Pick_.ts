// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/** Same as built-in Pick, but no template argument constraint on K */
export type Pick_<O, K> = Pick<O, K & keyof O>

export type $Pick_<O, K> = O extends any
	? [K] extends [keyof any]
		? { [k in K]: k extends keyof O ? O[k] : never }
		: never
	: never

export type $Pick<O extends {}, K extends keyof O> = O extends any
	? Pick<O, K>
	: never
