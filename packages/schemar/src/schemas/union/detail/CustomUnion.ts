// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	BASE_OPTIONS,
	CustomSchema,
	DEFAULT_OPTIONS,
	DefaultUnionOptions,
	OPTIONS,
	SCHEMA_NAME,
	UnionOptions,
} from '~'

export interface CustomUnion<O extends Partial<UnionOptions>>
	extends CustomSchema<O> {
	readonly [SCHEMA_NAME]: 'Union'
	readonly [BASE_OPTIONS]: UnionOptions
	readonly [DEFAULT_OPTIONS]: DefaultUnionOptions

	get getSchemas(): this[OPTIONS]['schemas']
}
