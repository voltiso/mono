// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Assume } from '@voltiso/util'

import type {
	BASE_OPTIONS,
	CustomSchema,
	DEFAULT_OPTIONS,
	DefaultUnknownLiteralOptions,
	MergeSchemaOptions,
	OPTIONS,
	PARTIAL_OPTIONS,
	SCHEMA_NAME,
	UnknownLiteralOptions,
} from '~'

export interface CustomUnknownLiteral<O extends Partial<UnknownLiteralOptions>>
	extends CustomSchema<O> {
	[SCHEMA_NAME]: 'UnknownLiteral'

	readonly [BASE_OPTIONS]: UnknownLiteralOptions
	readonly [DEFAULT_OPTIONS]: DefaultUnknownLiteralOptions

	readonly [PARTIAL_OPTIONS]: O

	readonly [OPTIONS]: Assume<
		UnknownLiteralOptions,
		MergeSchemaOptions<DefaultUnknownLiteralOptions, O>
	>

	// [BASE_OPTIONS]: UnknownLiteralOptions
	// [DEFAULT_OPTIONS]: DefaultUnknownLiteralOptions
}
