// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SCHEMA_NAME, SchemaOptions } from '~'

import type { CustomSchema, PARTIAL_OPTIONS } from '.'

export interface CustomTypeOnly<O extends Partial<SchemaOptions>>
	extends CustomSchema<O> {
	readonly [SCHEMA_NAME]: 'TypeOnly'

	readonly [PARTIAL_OPTIONS]: O
}
