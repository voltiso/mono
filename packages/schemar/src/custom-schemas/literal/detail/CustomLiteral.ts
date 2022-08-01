// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	BASE_OPTIONS,
	DEFAULT_OPTIONS,
	OPTIONS,
	PARTIAL_OPTIONS,
	SCHEMA_NAME,
} from '_'
import type { Assume } from '@voltiso/util'

import type {
	CustomSchema,
	DefaultLiteralOptions,
	LiteralOptions,
	MergeSchemaOptions,
} from '~'

export interface CustomLiteral<O extends Partial<LiteralOptions>>
	extends CustomSchema<O> {
	//
	readonly [SCHEMA_NAME]: 'Literal'

	readonly [BASE_OPTIONS]: LiteralOptions
	readonly [DEFAULT_OPTIONS]: DefaultLiteralOptions

	readonly [PARTIAL_OPTIONS]: O

	readonly [OPTIONS]: Assume<
		LiteralOptions,
		MergeSchemaOptions<DefaultLiteralOptions, O>
	>

	// readonly [BASE_OPTIONS]: LiteralOptions
	// readonly [DEFAULT_OPTIONS]: DefaultLiteralOptions

	getValues: this[OPTIONS]['values']
}
