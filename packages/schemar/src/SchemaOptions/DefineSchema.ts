// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	DefinePartialSchemaOptions,
	GetSchemaByName,
	ISchema,
	SCHEMA_NAME,
} from '~'

export type DefineSchema<S extends ISchema, O> = GetSchemaByName<
	S[SCHEMA_NAME],
	DefinePartialSchemaOptions<S, O>
>
