// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { CustomSchema, CustomSchema$ } from '~'

import type { UnknownSymbolOptions } from './UnknownSymbolOptions'

export interface CustomUnknownSymbol<O extends Partial<UnknownSymbolOptions>>
	extends CustomSchema<O> {
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'UnknownSymbol'

	readonly [Voltiso.BASE_OPTIONS]: UnknownSymbolOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: UnknownSymbolOptions.Default
}

//

export interface CustomUnknownSymbol$<O extends Partial<UnknownSymbolOptions>>
	extends CustomSchema$<O> {
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'UnknownSymbol'

	readonly [Voltiso.BASE_OPTIONS]: UnknownSymbolOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: UnknownSymbolOptions.Default

	//

	get Final(): CustomUnknownSymbol<O>
}
