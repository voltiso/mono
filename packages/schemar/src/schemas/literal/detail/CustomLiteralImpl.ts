// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { isSubset, lazyConstructor, toString } from '@voltiso/util'

import type { CustomLiteral, DefineLiteralOptions, LiteralOptions } from '~'
import {
	type InferableLiteral,
	type ISchema,
	CustomSchemaImpl,
	EXTENDS,
	isLiteral,
	isUnknownLiteral,
	literalValueExtends,
	SCHEMA_OPTIONS,
	SCHEMA_NAME,
} from '~'
import * as s from '~/schemas'

export class CustomLiteralImpl<O extends Partial<LiteralOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomLiteral<O>
{
	readonly [SCHEMA_NAME] = 'Literal' as const
	// readonly [IS_LITERAL] = true

	get getValues(): DefineLiteralOptions<O>['values'] {
		// eslint-disable-next-line security/detect-object-injection
		return this[SCHEMA_OPTIONS].values as never
	}

	// constructor(o: O) {
	// 	super(o)
	// }

	override [EXTENDS](other: ISchema): boolean {
		if (isLiteral(other)) return isSubset(this.getValues, other.getValues)
		else if (isUnknownLiteral(other)) return true

		let good = true

		for (const l of this.getValues) {
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

		if (!this.getValues.has(x as InferableLiteral)) {
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
		return [...this.getValues].map(x => toString(x)).join(' | ')
	}
}
