// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import {
	type BASE_OPTIONS,
	type DEFAULT_OPTIONS,
	EXTENDS,
	SCHEMA_NAME,
} from '_'
import { CALL, callableInstance, lazyConstructor } from '@voltiso/util'

import type {
	CustomSymbol,
	DefaultSymbolOptions,
	ISchema,
	Literal,
	SymbolOptions,
} from '~'
import { CustomSchemaImpl, isSymbol, literal } from '~'

//! esbuild bug: Cannot `declare` inside class - using interface merging instead
export interface CustomSymbolImpl<O> {
	readonly [BASE_OPTIONS]: SymbolOptions
	readonly [DEFAULT_OPTIONS]: DefaultSymbolOptions
}

export class CustomSymbolImpl<O extends Partial<SymbolOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomSymbol<O>
{
	readonly [SCHEMA_NAME] = 'Symbol' as const

	constructor(o: O) {
		super(o)
		// eslint-disable-next-line no-constructor-return
		return callableInstance(this) as never
	}

	// eslint-disable-next-line class-methods-use-this
	[CALL]<L extends symbol>(...args: L[] | [Set<L>]): Literal<L> {
		const literals = args[0] instanceof Set ? args[0] : new Set(args as L[])
		return literal(literals) as never
	}

	override [EXTENDS](other: ISchema): boolean {
		if (isSymbol(other)) return true
		// eslint-disable-next-line security/detect-object-injection
		else return super[EXTENDS](other)
	}
}
