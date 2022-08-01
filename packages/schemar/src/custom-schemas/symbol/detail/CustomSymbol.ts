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
	DefaultSymbolOptions,
	MergeSchemaOptions,
	SymbolOptions,
} from '~'

export interface CustomSymbol<O extends Partial<SymbolOptions>>
	extends CustomSchema<O> {
	readonly [SCHEMA_NAME]: 'Symbol'

	readonly [BASE_OPTIONS]: SymbolOptions
	readonly [DEFAULT_OPTIONS]: DefaultSymbolOptions

	readonly [PARTIAL_OPTIONS]: O

	readonly [OPTIONS]: Assume<
		SymbolOptions,
		MergeSchemaOptions<DefaultSymbolOptions, O>
	>
}
