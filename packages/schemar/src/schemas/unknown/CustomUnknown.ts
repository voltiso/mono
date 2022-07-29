// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	BASE_OPTIONS,
	CustomSchema,
	DEFAULT_OPTIONS,
	DefaultUnknownOptions,
	SCHEMA_NAME,
	UnknownOptions,
} from '~'

export interface CustomUnknown<O extends Partial<UnknownOptions>>
	extends CustomSchema<O> {
	//
	readonly [SCHEMA_NAME]: 'Unknown'
	readonly [BASE_OPTIONS]: UnknownOptions
	readonly [DEFAULT_OPTIONS]: DefaultUnknownOptions
}
