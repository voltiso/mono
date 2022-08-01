// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { PARTIAL_OPTIONS, SCHEMA_NAME } from '_'

import type { SchemaOptions } from '~'

import type { CustomSchema } from '.'

export interface CustomTypeOnly<O extends Partial<SchemaOptions>>
	extends CustomSchema<O> {
	readonly [SCHEMA_NAME]: 'TypeOnly'

	readonly [PARTIAL_OPTIONS]: O
}
