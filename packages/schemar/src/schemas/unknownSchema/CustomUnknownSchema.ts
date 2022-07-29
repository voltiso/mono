// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	BASE_OPTIONS,
	CustomSchema,
	DEFAULT_OPTIONS,
	DefaultUnknownSchemaOptions,
	SCHEMA_NAME,
	UnknownSchemaOptions,
} from '~'

export interface CustomUnknownSchema<O extends Partial<UnknownSchemaOptions>>
	extends CustomSchema<O> {
	readonly [SCHEMA_NAME]: 'UnknownSchema'
	readonly [BASE_OPTIONS]: UnknownSchemaOptions
	readonly [DEFAULT_OPTIONS]: DefaultUnknownSchemaOptions
}
