// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	CustomUnknownSymbol,
	DefaultUnknownSymbolOptions,
	ISchema,
	Literal,
	UnknownSymbolOptions,
} from '@voltiso/schemar.types'
import { EXTENDS, isSymbol, SCHEMA_NAME } from '@voltiso/schemar.types'
import type { BASE_OPTIONS, DEFAULT_OPTIONS } from '@voltiso/util'
import { BoundCallable, CALL, lazyConstructor } from '@voltiso/util'

import { CustomSchemaImpl, literal } from '~'

//! esbuild bug: Cannot `declare` inside class - using interface merging instead
export interface CustomUnknownSymbolImpl<O> {
	readonly [BASE_OPTIONS]: UnknownSymbolOptions
	readonly [DEFAULT_OPTIONS]: DefaultUnknownSymbolOptions
}

export class CustomUnknownSymbolImpl<O extends Partial<UnknownSymbolOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomUnknownSymbol<O>
{
	readonly [SCHEMA_NAME] = 'UnknownSymbol' as const

	constructor(o: O) {
		super(o)
		// eslint-disable-next-line no-constructor-return
		return BoundCallable(this) as never
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
