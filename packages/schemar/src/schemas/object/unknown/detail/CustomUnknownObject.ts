// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	BASE_OPTIONS,
	CustomSchema,
	DEFAULT_OPTIONS,
	DefaultUnknownObjectOptions,
	SCHEMA_NAME,
	UnknownObjectOptions,
} from '~'

export interface CustomUnknownObject<O extends Partial<UnknownObjectOptions>>
	extends CustomSchema<O> {
	readonly [SCHEMA_NAME]: 'UnknownObject'
	readonly [DEFAULT_OPTIONS]: DefaultUnknownObjectOptions
	readonly [BASE_OPTIONS]: DefaultUnknownObjectOptions
}
