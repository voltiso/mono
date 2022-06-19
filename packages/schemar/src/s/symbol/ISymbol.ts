import { ISchema } from '../../schema'
import { SymbolOptions } from './_/SymbolOptions'

export const IS_SYMBOL = Symbol('IS_SYMBOL')
export type IS_SYMBOL = typeof IS_SYMBOL

export interface ISymbol<O extends SymbolOptions = SymbolOptions>
	extends ISchema<O> {
	readonly [IS_SYMBOL]: true
}

export function isSymbol(x: unknown): x is ISymbol {
	return !!(x as ISymbol | null)?.[IS_SYMBOL]
}
