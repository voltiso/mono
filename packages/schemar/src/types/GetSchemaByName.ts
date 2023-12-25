// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { CustomSchema$, SchemaOptions, Schemas } from '~'

//

export type GetSchema$ByName<
	schemaName,
	O extends Partial<SchemaOptions>,
> = string extends schemaName
	? CustomSchema$<O>
	: [schemaName] extends [keyof Schemas<O>]
		? schemaName extends keyof Schemas<O>
			? Schemas<O>[schemaName]
			: never
		: never
