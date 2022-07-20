// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	CustomSchema,
	DefaultOptions,
	OptionalOptions,
	OPTIONS,
	ReadonlyOptions,
} from '../../schema'
import type { SymbolOptions } from './_/SymbolOptions.js'
import type { ISymbol } from './ISymbol.js'

export interface CustomSymbol<O extends SymbolOptions>
	extends ISymbol<O>,
		CustomSchema<O> {
	//

	get optional(): Optional<this>
	get readonly(): Readonly<this>
	default(defaultValue: this[OPTIONS]['_out']): Default<this>
}

type Optional<This extends ISymbol> = CustomSymbol<OptionalOptions<This>>
type Readonly<This extends ISymbol> = CustomSymbol<ReadonlyOptions<This>>
type Default<This extends ISymbol> = CustomSymbol<DefaultOptions<This>>
