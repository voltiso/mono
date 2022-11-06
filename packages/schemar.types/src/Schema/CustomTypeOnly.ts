// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SCHEMA_NAME } from '_'
import type { PARTIAL_OPTIONS } from '@voltiso/util'

import type { SchemaOptions } from '~'
import type { CustomSchema } from '~/Schema'

export interface CustomTypeOnly<O extends Partial<SchemaOptions>>
	extends CustomSchema<O> {
	readonly [SCHEMA_NAME]: 'TypeOnly'

	readonly [PARTIAL_OPTIONS]: O
}
