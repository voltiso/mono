// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SCHEMA_NAME } from '_'

import type { CustomSchema } from '~/Schema'

import type { UnknownSchemaOptions } from './UnknownSchemaOptions'

export interface CustomUnknownSchema<O extends Partial<UnknownSchemaOptions>>
	extends CustomSchema<O> {
	readonly [SCHEMA_NAME]: 'UnknownSchema'
}
