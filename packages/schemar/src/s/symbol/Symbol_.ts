import { CALL, callableInstance, lazyConstructor } from '@voltiso/ts-util/class'
import { ISchema, Schema_ } from '../../schema'
import { CustomSymbol } from './CustomSymbol'
import { isSymbol, IS_SYMBOL } from './ISymbol'
import {
	defaultSymbolOptions,
	DefaultSymbolOptions,
	SymbolOptions,
} from './_/SymbolOptions'
import { EXTENDS } from '../../schema/_/symbols'
import * as s from '..'

class Symbol__<O extends SymbolOptions>
	extends lazyConstructor(() => Schema_)<O>
	implements CustomSymbol<O>
{
	readonly [IS_SYMBOL] = true

	constructor(o: O) {
		super(o)
		return callableInstance(this) as never
	}

	[CALL]<L extends symbol>(...args: L[] | [Set<L>]): s.Literal<L> {
		const literals = args[0] instanceof Set ? args[0] : new Set(args as L[])
		return s.literal(literals)
	}

	override [EXTENDS](other: ISchema): boolean {
		if (isSymbol(other)) return true
		else return super[EXTENDS](other)
	}
}

//

export class Symbol_ extends Symbol__<DefaultSymbolOptions> {
	constructor() {
		super(defaultSymbolOptions as never)
	}
}
