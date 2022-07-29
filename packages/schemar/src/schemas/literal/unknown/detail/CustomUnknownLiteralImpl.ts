// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { CALL, callableInstance, lazyConstructor } from '@voltiso/util'

import type {
	CustomUnknownLiteral,
	DefaultUnknownLiteralOptions,
	InferableLiteral,
	ISchema,
	UnknownLiteralOptions,
	ValidationIssue,
} from '~'
import {
	BASE_OPTIONS,
	CustomSchemaImpl,
	DEFAULT_OPTIONS,
	EXTENDS,
	isUnknownLiteral,
	LiteralImpl,
	SCHEMA_NAME,
} from '~'

export class CustomUnknownLiteralImpl<O extends Partial<UnknownLiteralOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomUnknownLiteral<O>
{
	declare readonly [SCHEMA_NAME]: 'UnknownLiteral';

	declare readonly [BASE_OPTIONS]: UnknownLiteralOptions;
	declare readonly [DEFAULT_OPTIONS]: DefaultUnknownLiteralOptions

	constructor(o: O) {
		super(o)
		// eslint-disable-next-line no-constructor-return
		return callableInstance(this) as never
	}

	override [EXTENDS](other: ISchema): boolean {
		if (isUnknownLiteral(other)) return true
		// eslint-disable-next-line security/detect-object-injection
		else return super[EXTENDS](other)
	}

	override _getIssuesImpl(x: unknown): ValidationIssue[] {
		return super._getIssuesImpl(x)
	}

	// eslint-disable-next-line class-methods-use-this
	override _toString(): string {
		return 'literal'
	}

	[CALL]<L extends InferableLiteral>(...literals: L[]): LiteralImpl<L>
	[CALL]<L extends InferableLiteral>(literals: Set<L>): LiteralImpl<L>
	[CALL]<L extends InferableLiteral>(...args: L[] | [Set<L>]): LiteralImpl<L>

	// eslint-disable-next-line class-methods-use-this
	[CALL]<L extends InferableLiteral>(...args: L[] | [Set<L>]): LiteralImpl<L> {
		return new LiteralImpl(...args) as never
	}
}
