// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	BASE_OPTIONS,
	CustomSchema,
	DEFAULT_OPTIONS,
	DefaultSymbolOptions,
	SCHEMA_NAME,
	SymbolOptions,
} from '~'

export interface CustomSymbol<O extends Partial<SymbolOptions>>
	extends CustomSchema<O> {
	readonly [SCHEMA_NAME]: 'Symbol'

	readonly [BASE_OPTIONS]: SymbolOptions
	readonly [DEFAULT_OPTIONS]: DefaultSymbolOptions
}
