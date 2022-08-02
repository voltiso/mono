// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { PARTIAL_OPTIONS } from '_'

import type { MergeSchemaOptions } from '~'

export type DefinePartialSchemaOptions<S, O> = S extends {
	[PARTIAL_OPTIONS]: {}
}
	? MergeSchemaOptions<S[PARTIAL_OPTIONS], O>
	: never

// export type DefinePartialSchemaOptions<
// 	S extends ISchema,
// 	O extends Partial<S[BASE_OPTIONS]>,
// > = Assume<Partial<S[BASE_OPTIONS]>, MergeSchemaOptions<S[PARTIAL_OPTIONS], O>>
