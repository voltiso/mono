// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	BASE_OPTIONS,
	CustomSchema,
	DEFAULT_OPTIONS,
	DefaultNeverOptions,
	NeverOptions,
	SCHEMA_NAME,
} from '~'

export interface CustomNever<O extends Partial<NeverOptions>>
	extends CustomSchema<O> {
	//
	readonly [SCHEMA_NAME]: 'Never'

	readonly [BASE_OPTIONS]: NeverOptions
	readonly [DEFAULT_OPTIONS]: DefaultNeverOptions

	// readonly [PARTIAL_OPTIONS]: O

	// readonly [OPTIONS]: Assume<
	// 	this[BASE_OPTIONS],
	// 	MergeSchemaOptions<this[DEFAULT_OPTIONS], this[PARTIAL_OPTIONS]>
	// >

	// readonly [OPTIONS]: Assume<
	// 	NeverOptions,
	// 	MergeSchemaOptions<DefaultNeverOptions, O>
	// >
}
