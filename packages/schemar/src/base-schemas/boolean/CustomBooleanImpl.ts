// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { EXTENDS, SCHEMA_NAME } from '_'
import {
	$fastAssert,
	BoundCallable,
	CALL,
	lazyConstructor,
	OPTIONS,
} from '@voltiso/util'

import type { BooleanOptions, CustomBoolean, Literal, Schema } from '~'
import {
	CustomSchemaImpl,
	isBooleanSchema,
	isLiteralSchema,
	isUnionSchema,
	isUnknownLiteralSchema,
} from '~'
import { literal } from '~/core-schemas'
import { ValidationIssue } from '~/meta-schemas'

import { _booleanCollectTrueFalse } from './_booleanCollectTrueFalse'

$fastAssert(EXTENDS)
$fastAssert(SCHEMA_NAME)
$fastAssert(OPTIONS)

// ! esbuild bug: Cannot `declare` inside class - using interface merging instead
export interface CustomBooleanImpl<O> {
	readonly [Voltiso.BASE_OPTIONS]: BooleanOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: BooleanOptions.Default
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CustomBooleanImpl<O extends Partial<BooleanOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomBoolean<O>
{
	// eslint-disable-next-line es-x/no-class-instance-fields
	override readonly [Voltiso.Schemar.SCHEMA_NAME] = 'Boolean' as const

	constructor(o: O) {
		super(o)
		// eslint-disable-next-line no-constructor-return
		return BoundCallable(this) as never
	}

	[CALL]<L extends boolean>(...literals: L[]): Literal<L>
	[CALL]<L extends boolean>(literals: Set<L>): Literal<L>
	[CALL]<L extends boolean>(...args: L[] | [Set<L>]): Literal<L>

	// eslint-disable-next-line @typescript-eslint/class-methods-use-this
	[CALL]<L extends boolean>(...args: L[] | [Set<L>]): Literal<L> {
		const literals = args[0] instanceof Set ? args[0] : new Set(args as L[])
		return literal(literals) as never
	}

	override [Voltiso.Schemar.EXTENDS](other: Schema): boolean {
		if (isBooleanSchema(other)) return true
		else if (isUnknownLiteralSchema(other)) return true
		else if (isLiteralSchema(other) || isUnionSchema(other)) {
			const { haveTrue, haveFalse } = _booleanCollectTrueFalse(other)
			return haveTrue && haveFalse
		} else return super[Voltiso.Schemar.EXTENDS](other)
	}

	override _getIssues(value: unknown): ValidationIssue[] {
		const issues: ValidationIssue[] = []

		if (typeof value !== 'boolean')
			issues.push(
				new ValidationIssue({
					name: this[Voltiso.OPTIONS].name,
					expected: { description: 'boolean' },
					received: { value },
				}),
			)

		return issues
	}

	// eslint-disable-next-line @typescript-eslint/class-methods-use-this
	override _toString(): string {
		return 'boolean'
	}
}
