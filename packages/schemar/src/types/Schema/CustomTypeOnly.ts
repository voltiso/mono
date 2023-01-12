// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DEFAULT_OPTIONS } from '@voltiso/util'

import type { CustomSchema, SCHEMA_NAME, SchemaOptions } from '~'

export interface CustomTypeOnly<O extends Partial<SchemaOptions>>
	extends CustomSchema<O> {
	readonly [SCHEMA_NAME]: 'TypeOnly'

	readonly [DEFAULT_OPTIONS]: SchemaOptions.Default // use global defaults
}
