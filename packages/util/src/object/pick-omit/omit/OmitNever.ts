// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export type OmitNever_<O> = Pick<
	O,
	{
		[k in keyof O]: O extends { readonly [kk in k]?: never } ? never : k
	}[keyof O]
>

export type OmitNever<O extends object> = OmitNever_<O>

export type $OmitNever_<O> = O extends any ? OmitNever_<O> : never

export type $OmitNever<O extends object> = $OmitNever_<O>
