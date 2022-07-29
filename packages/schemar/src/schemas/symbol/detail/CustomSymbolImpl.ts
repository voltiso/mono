// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { CALL, callableInstance, lazyConstructor } from '@voltiso/util'

import type {
	CustomSymbol,
	DefaultSymbolOptions,
	ISchema,
	SymbolOptions,
} from '~'
import {
	BASE_OPTIONS,
	CustomSchemaImpl,
	DEFAULT_OPTIONS,
	EXTENDS,
	isSymbol,
	SCHEMA_NAME,
} from '~'
import * as s from '~/schemas'

export class CustomSymbolImpl<O extends Partial<SymbolOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomSymbol<O>
{
	declare readonly [SCHEMA_NAME]: 'Symbol';

	declare readonly [BASE_OPTIONS]: SymbolOptions;
	declare readonly [DEFAULT_OPTIONS]: DefaultSymbolOptions

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
