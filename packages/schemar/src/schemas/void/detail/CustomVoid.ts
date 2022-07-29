// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	BASE_OPTIONS,
	CustomSchema,
	DEFAULT_OPTIONS,
	DefaultVoidOptions,
	SCHEMA_NAME,
	VoidOptions,
} from '~'

export interface CustomVoid<O extends Partial<VoidOptions>>
	extends CustomSchema<O> {
	readonly [SCHEMA_NAME]: 'Void'

	readonly [BASE_OPTIONS]: VoidOptions
	readonly [DEFAULT_OPTIONS]: DefaultVoidOptions
}
