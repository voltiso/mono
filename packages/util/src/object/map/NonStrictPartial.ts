// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export type NonStrictPartial_<O> = {
	[k in keyof O]?: O[k] | undefined
}

export type NonStrictPartial<O extends object> = NonStrictPartial_<O>

//

export type $NonStrictPartial_<O> = O extends any ? NonStrictPartial_<O> : never

export type $NonStrictPartial<O extends object> = $NonStrictPartial_<O>
