// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { BASE_OPTIONS, DEFAULT_OPTIONS } from '@voltiso/util'

import type { CustomSchema, CustomSchema$, SCHEMA_NAME } from '~'

import type { UnknownSymbolOptions } from './UnknownSymbolOptions'

export interface CustomUnknownSymbol<O extends Partial<UnknownSymbolOptions>>
	extends CustomSchema<O> {
	readonly [SCHEMA_NAME]: 'UnknownSymbol'

	readonly [BASE_OPTIONS]: UnknownSymbolOptions
	readonly [DEFAULT_OPTIONS]: UnknownSymbolOptions.Default
}

//

export interface CustomUnknownSymbol$<O extends Partial<UnknownSymbolOptions>>
	extends CustomSchema$<O> {
	readonly [SCHEMA_NAME]: 'UnknownSymbol'

	readonly [BASE_OPTIONS]: UnknownSymbolOptions
	readonly [DEFAULT_OPTIONS]: UnknownSymbolOptions.Default

	//

	get Final(): CustomUnknownSymbol<O>
}
