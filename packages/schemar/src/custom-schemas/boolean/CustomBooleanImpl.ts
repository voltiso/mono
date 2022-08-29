// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	BASE_OPTIONS,
	BooleanOptions,
	CustomBoolean,
	DEFAULT_OPTIONS,
	DefaultBooleanOptions,
	ISchema,
	Literal,
} from '@voltiso/schemar.types'
import {
	isBoolean,
	isLiteral,
	isUnion,
	isUnknownLiteral,
} from '@voltiso/schemar.types'
import { EXTENDS, SCHEMA_NAME } from '@voltiso/schemar.types'
import { CALL, callableInstance, lazyConstructor } from '@voltiso/util'

import { CustomSchemaImpl } from '~/Schema'

import { literal } from '../literal'
import { ValidationIssue } from '../validation'
import { _booleanCollectTrueFalse } from './_booleanCollectTrueFalse'

//! esbuild bug: Cannot `declare` inside class - using interface merging instead
export interface CustomBooleanImpl<O> {
	readonly [BASE_OPTIONS]: BooleanOptions
	readonly [DEFAULT_OPTIONS]: DefaultBooleanOptions
}

export class CustomBooleanImpl<O extends Partial<BooleanOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomBoolean<O>
{
	readonly [SCHEMA_NAME] = 'Boolean' as const

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
			// eslint-disable-next-line etc/no-internal
			const { haveTrue, haveFalse } = _booleanCollectTrueFalse(other)
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
