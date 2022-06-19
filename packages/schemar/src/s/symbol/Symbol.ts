/* eslint-disable @typescript-eslint/ban-types */
import { lazyValue } from '@voltiso/ts-util'
import { Literal_ } from '../literal'
import { CustomSymbol } from './CustomSymbol'
import { Symbol_ } from './Symbol_'
import { DefaultSymbolOptions } from './_/SymbolOptions'

export interface Symbol extends CustomSymbol<DefaultSymbolOptions> {
	<L extends symbol>(...literals: L[]): Literal_<L>
	<L extends symbol>(literals: Set<L>): Literal_<L>
	<L extends symbol>(...args: L[] | [Set<L>]): Literal_<L>
}
export const Symbol = Symbol_ as unknown as SymbolConstructor

type SymbolConstructor = new () => Symbol

//

export const symbol = lazyValue(() => new Symbol())
