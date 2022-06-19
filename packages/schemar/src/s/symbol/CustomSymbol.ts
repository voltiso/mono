import {
	CustomSchema,
	DefaultOptions,
	OptionalOptions,
	ReadonlyOptions,
} from '../../schema'
import { ISymbol } from './ISymbol'
import { SymbolOptions } from './_/SymbolOptions'

export interface CustomSymbol<O extends SymbolOptions>
	extends ISymbol<O>,
		CustomSchema<O> {
	//

	get optional(): Optional<this>
	get readonly(): Readonly<this>
	default<D>(defaultValue: D): Default<this, D>
}

type Optional<This extends ISymbol> = CustomSymbol<OptionalOptions<This>>
type Readonly<This extends ISymbol> = CustomSymbol<ReadonlyOptions<This>>
type Default<This extends ISymbol, D> = CustomSymbol<DefaultOptions<This, D>>
