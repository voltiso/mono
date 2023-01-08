// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { CustomSchema, SchemaOptions, Schemas } from '~'

//

export type GetSchemaByName<
	schemaName,
	O extends Partial<SchemaOptions>,
> = string extends schemaName
	? CustomSchema<O>
	: [schemaName] extends [keyof Schemas<O>]
	? schemaName extends keyof Schemas<O>
		? Schemas<O>[schemaName]
		: never
	: never

export type GetSchemaByName_<schemaName, O> = O extends Partial<SchemaOptions>
	? GetSchemaByName<schemaName, O>
	: never
