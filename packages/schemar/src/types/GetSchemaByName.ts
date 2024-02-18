// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { CustomSchema$, SchemaOptions, Schemas } from '~'

//

export type GetSchema$ByName<
	SchemaName,
	O extends Partial<SchemaOptions>,
> = string extends SchemaName
	? CustomSchema$<O>
	: [SchemaName] extends [keyof Schemas<O>]
		? SchemaName extends keyof Schemas<O>
			? Schemas<O>[SchemaName]
			: never
		: never
