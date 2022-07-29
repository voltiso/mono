// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	BASE_OPTIONS,
	BooleanOptions,
	CustomSchema,
	DEFAULT_OPTIONS,
	DefaultBooleanOptions,
	SCHEMA_NAME,
} from '~'

export interface CustomBoolean<O extends Partial<BooleanOptions>>
	extends CustomSchema<O> {
	//
	readonly [SCHEMA_NAME]: 'Boolean'
	readonly [BASE_OPTIONS]: BooleanOptions
	readonly [DEFAULT_OPTIONS]: DefaultBooleanOptions
}
