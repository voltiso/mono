// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { PARTIAL_OPTIONS } from '@voltiso/util'

import type { CustomSchema, SCHEMA_NAME, SchemaOptions } from '~'

export interface CustomTypeOnly<O extends Partial<SchemaOptions>>
	extends CustomSchema<O> {
	readonly [SCHEMA_NAME]: 'TypeOnly'

	readonly [PARTIAL_OPTIONS]: O
}
