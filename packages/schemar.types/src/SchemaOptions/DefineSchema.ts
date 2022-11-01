// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SCHEMA_NAME } from '_'
import type { Override, PARTIAL_OPTIONS } from '@voltiso/util'

import type { $$Schema, GetSchemaByName } from '~'

export type DefineSchema<S extends $$Schema, O> = S extends {
	[PARTIAL_OPTIONS]: object
}
	? GetSchemaByName<S[SCHEMA_NAME], Override<S[PARTIAL_OPTIONS], O>>
	: never
