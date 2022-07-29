// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	BASE_OPTIONS,
	DEFAULT_OPTIONS,
	DefaultVoidOptions,
	ISchema,
	SCHEMA_NAME,
	VoidOptions,
} from '~'

export interface IVoid extends ISchema {
	readonly [SCHEMA_NAME]: 'Void'

	readonly [BASE_OPTIONS]: VoidOptions
	readonly [DEFAULT_OPTIONS]: DefaultVoidOptions
}
