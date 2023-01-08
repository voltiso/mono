// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export type PartialOrUndefined_<O> = O extends object
	? {
			[k in keyof O]?: O[k] | undefined
	  }
	: never

export type PartialOrUndefined<O extends object> = PartialOrUndefined_<O>
