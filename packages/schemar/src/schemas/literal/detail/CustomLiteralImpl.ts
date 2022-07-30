// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { isSubset, lazyConstructor, toString } from '@voltiso/util'

import type {
	CustomLiteral,
	DefaultLiteralOptions,
	InferableLiteral,
	ISchema,
	LiteralOptions,
} from '~'
import {
	BASE_OPTIONS,
	CustomSchemaImpl,
	DEFAULT_OPTIONS,
	EXTENDS,
	isLiteral,
	isUnknownLiteral,
	literalValueExtends,
	OPTIONS,
	SCHEMA_NAME,
} from '~'
import * as s from '~'

export class CustomLiteralImpl<O extends Partial<LiteralOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomLiteral<O>
{
	readonly [SCHEMA_NAME] = 'Literal' as const;

	declare readonly [BASE_OPTIONS]: LiteralOptions;
	declare readonly [DEFAULT_OPTIONS]: DefaultLiteralOptions

	get getValues(): this[OPTIONS]['values'] {
		// eslint-disable-next-line security/detect-object-injection
		return this[OPTIONS].values as never
	}

	// constructor(o: O) {
	// 	super(o)
	// }

	override [EXTENDS](other: ISchema): boolean {
		if (isLiteral(other)) return isSubset(this.getValues, other.getValues)
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

	override _getIssuesImpl(x: unknown): s.ValidationIssue[] {
		const issues = super._getIssuesImpl(x)

		if (!(this.getValues as Set<InferableLiteral>).has(x as InferableLiteral)) {
			issues.push(
				new s.ValidationIssue({
					expectedOneOf: this.getValues,
					received: x,
				}),
			)
		}

		return issues
	}

	override _toString(): string {
		return [...(this.getValues as unknown as InferableLiteral[])]
			.map(x => toString(x))
			.join(' | ')
	}
}
