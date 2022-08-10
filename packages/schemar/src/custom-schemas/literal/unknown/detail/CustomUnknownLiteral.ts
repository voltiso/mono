// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { BASE_OPTIONS, DEFAULT_OPTIONS, SCHEMA_NAME } from '_'

import type {
	CustomSchema,
	DefaultUnknownLiteralOptions,
	UnknownLiteralOptions,
} from '~'

export interface CustomUnknownLiteral<O extends Partial<UnknownLiteralOptions>>
	extends CustomSchema<O> {
	[SCHEMA_NAME]: 'UnknownLiteral'

	readonly [BASE_OPTIONS]: UnknownLiteralOptions
	readonly [DEFAULT_OPTIONS]: DefaultUnknownLiteralOptions

	// readonly [PARTIAL_OPTIONS]: O

	// readonly [OPTIONS]: Assume<
	// 	UnknownLiteralOptions,
	// 	MergeSchemaOptions<DefaultUnknownLiteralOptions, O>
	// >
}
