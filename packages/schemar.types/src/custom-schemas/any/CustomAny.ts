// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	AnyOptions,
	BASE_OPTIONS,
	CustomSchema,
	DEFAULT_OPTIONS,
	DefaultAnyOptions,
	SCHEMA_NAME,
} from '~'

export interface CustomAny<O extends Partial<AnyOptions>>
	extends CustomSchema<O> {
	//
	readonly [SCHEMA_NAME]: 'Any'

	readonly [BASE_OPTIONS]: AnyOptions
	readonly [DEFAULT_OPTIONS]: DefaultAnyOptions
}
