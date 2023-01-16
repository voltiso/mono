// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/** Make properties optional AND union with `undefined` */
export type NonStrictPartial_<O> = {
	[k in keyof O]?: O[k] | undefined
}

/** Make properties optional AND union with `undefined` */
export type NonStrictPartial<O extends object> = NonStrictPartial_<O>

//

/** Make properties optional AND union with `undefined` */
export type $NonStrictPartial_<O> = O extends any ? NonStrictPartial_<O> : never

/** Make properties optional AND union with `undefined` */
export type $NonStrictPartial<O extends object> = $NonStrictPartial_<O>
