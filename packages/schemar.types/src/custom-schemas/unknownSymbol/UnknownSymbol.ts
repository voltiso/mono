import type { Literal } from '~/custom-schemas'
import type { CustomUnknownSymbol } from './CustomUnknownSymbol'

export interface UnknownSymbol extends CustomUnknownSymbol<{}> {
	<L extends symbol>(...literals: L[]): Literal<L>
	<L extends symbol>(literals: Set<L>): Literal<L>
	<L extends symbol>(...args: L[] | [Set<L>]): Literal<L>
}

export type UnknownSymbolConstructor = new () => UnknownSymbol
