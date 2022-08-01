// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SCHEMA_NAME } from '_'

import type { DefinePartialSchemaOptions, GetSchemaByName } from '~'

export type DefineSchema<S, O> = S extends { [SCHEMA_NAME]: string }
	? GetSchemaByName<S[SCHEMA_NAME], DefinePartialSchemaOptions<S, O>>
	: never

// export type DefineSchema<S extends ISchema, O> = GetSchemaByName<
// 	S[SCHEMA_NAME],
// 	DefinePartialSchemaOptions<S, O>
// >
