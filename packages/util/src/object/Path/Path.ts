// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export type Path<O> =
	| readonly []
	| (O extends object
			? {
					[k in keyof O]: readonly [k, ...Path<O[k]>]
			  }[keyof O]
			: never)
