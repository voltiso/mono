// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable max-classes-per-file */

import { CALL, callableInstance, lazyConstructor } from '@voltiso/util'

import type { ISchema } from '../../schema'
import { Schema_ } from '../../schema'
import { EXTENDS } from '../../schema/_/symbols.js'
import * as s from '..'
import type { DefaultSymbolOptions, SymbolOptions } from './_/SymbolOptions.js'
import { defaultSymbolOptions } from './_/SymbolOptions.js'
import type { CustomSymbol } from './CustomSymbol.js'
import { IS_SYMBOL, isSymbol } from './ISymbol.js'

class Symbol__<O extends SymbolOptions>
	extends lazyConstructor(() => Schema_)<O>
	implements CustomSymbol<O>
{
	readonly [IS_SYMBOL] = true

	constructor(o: O) {
		super(o)
		// eslint-disable-next-line no-constructor-return
		return callableInstance(this) as never
	}

	// eslint-disable-next-line class-methods-use-this
	[CALL]<L extends symbol>(...args: L[] | [Set<L>]): s.Literal<L> {
		const literals = args[0] instanceof Set ? args[0] : new Set(args as L[])
		return s.literal(literals)
	}

	override [EXTENDS](other: ISchema): boolean {
		if (isSymbol(other)) return true
		// eslint-disable-next-line security/detect-object-injection
		else return super[EXTENDS](other)
	}
}

//

export class Symbol_ extends Symbol__<DefaultSymbolOptions> {
	constructor() {
		super(defaultSymbolOptions as never)
	}
}
