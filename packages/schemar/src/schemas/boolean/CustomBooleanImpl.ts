// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { CALL, callableInstance, lazyConstructor } from '@voltiso/util'

import type {
	BooleanOptions,
	CustomBoolean,
	DefaultBooleanOptions,
	ISchema,
	Literal,
} from '~'
import {
	BASE_OPTIONS,
	collectTrueFalse,
	CustomSchemaImpl,
	DEFAULT_OPTIONS,
	EXTENDS,
	isBoolean,
	isLiteral,
	isUnion,
	isUnknownLiteral,
	literal,
	SCHEMA_NAME,
	ValidationIssue,
} from '~'

export class CustomBooleanImpl<O extends Partial<BooleanOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomBoolean<O>
{
	declare readonly [SCHEMA_NAME]: 'Boolean';
	declare readonly [BASE_OPTIONS]: BooleanOptions;
	declare readonly [DEFAULT_OPTIONS]: DefaultBooleanOptions

	constructor(o: O) {
		super(o)
		// eslint-disable-next-line no-constructor-return
		return callableInstance(this) as never
	}

	[CALL]<L extends boolean>(...literals: L[]): Literal<L>
	[CALL]<L extends boolean>(literals: Set<L>): Literal<L>
	[CALL]<L extends boolean>(...args: L[] | [Set<L>]): Literal<L>

	// eslint-disable-next-line class-methods-use-this
	[CALL]<L extends boolean>(...args: L[] | [Set<L>]): Literal<L> {
		const literals = args[0] instanceof Set ? args[0] : new Set(args as L[])
		return literal(literals) as never
	}

	override [EXTENDS](other: ISchema): boolean {
		if (isBoolean(other)) return true
		else if (isUnknownLiteral(other)) return true
		else if (isLiteral(other) || isUnion(other)) {
			const { haveTrue, haveFalse } = collectTrueFalse(other)
			return haveTrue && haveFalse
			// eslint-disable-next-line security/detect-object-injection
		} else return super[EXTENDS](other)
	}

	override _getIssuesImpl(x: unknown): ValidationIssue[] {
		const issues = super._getIssuesImpl(x)

		if (typeof x !== 'boolean')
			issues.push(
				new ValidationIssue({
					expectedDescription: 'boolean',
					received: x,
				}),
			)

		return issues
	}

	// eslint-disable-next-line class-methods-use-this
	override _toString(): string {
		return 'boolean'
	}
}
