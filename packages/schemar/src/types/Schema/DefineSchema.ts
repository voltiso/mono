// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Override, PARTIAL_OPTIONS } from '@voltiso/util'

import type { GetSchemaByName, SCHEMA_NAME } from '~'

export type DefineSchema<This, O> = This extends {
	readonly [SCHEMA_NAME]?: unknown
	readonly [PARTIAL_OPTIONS]?: unknown
}
	? GetSchemaByName<This[SCHEMA_NAME], Override<This[PARTIAL_OPTIONS], O>>
	: never
