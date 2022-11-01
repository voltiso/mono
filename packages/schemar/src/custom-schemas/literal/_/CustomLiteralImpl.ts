// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	CustomLiteral,
	DefaultLiteralOptions,
	InferableLiteral,
	ISchema,
	LiteralOptions,
} from '@voltiso/schemar.types'
import {
	EXTENDS,
	isLiteral,
	isUnknownLiteral,
	SCHEMA_NAME,
} from '@voltiso/schemar.types'
import type { BASE_OPTIONS, DEFAULT_OPTIONS } from '@voltiso/util'
import { isSubset, lazyConstructor, OPTIONS, stringFrom } from '@voltiso/util'

import { ValidationIssue } from '~/custom-schemas/validation'
import { CustomSchemaImpl } from '~/Schema'

import { literalValueExtends } from './literalValueExtends'

//! esbuild bug: Cannot `declare` inside class - using interface merging instead
export interface CustomLiteralImpl<O> {
	readonly [BASE_OPTIONS]: LiteralOptions
	readonly [DEFAULT_OPTIONS]: DefaultLiteralOptions
}

export class CustomLiteralImpl<O extends Partial<LiteralOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomLiteral<O>
{
	readonly [SCHEMA_NAME] = 'Literal' as const

	get getValues(): Set<this[OPTIONS]['Output']> {
		// eslint-disable-next-line security/detect-object-injection
		return this[OPTIONS].values as never
	}

	// constructor(o: O) {
	// 	super(o)
	// }

	override [EXTENDS](other: ISchema): boolean {
		if (isLiteral(other))
			return isSubset(this.getValues, other.getValues as never)
		else if (isUnknownLiteral(other)) return true

		let good = true

		for (const l of this.getValues as unknown as InferableLiteral[]) {
			// const isStillGood = getBaseSchema(l)[EXTENDS](other)
			const isStillGood = literalValueExtends(l, other)

			if (!isStillGood) {
				good = false
				break
			}
		}

		return good
	}

	override _getIssuesImpl(x: unknown): ValidationIssue[] {
		const issues = super._getIssuesImpl(x)

		if (!(this.getValues as Set<InferableLiteral>).has(x as InferableLiteral)) {
			issues.push(
				new ValidationIssue({
					expectedOneOf: this.getValues,
					received: x,
				}),
			)
		}

		return issues
	}

	override _toString(): string {
		return [...(this.getValues as unknown as InferableLiteral[])]
			.map(x => stringFrom(x))
			.join(' | ')
	}
}
